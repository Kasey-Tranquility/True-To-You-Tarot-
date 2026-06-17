const http = require("http");
const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const rootDir = __dirname;
const dataDir = path.join(rootDir, "data");
const readingsDir = path.join(dataDir, "readings");
const leadsFile = path.join(dataDir, "leads.jsonl");
const videoRequestsFile = path.join(dataDir, "video-requests.jsonl");
const port = Number(process.env.PORT || 4173);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml; charset=utf-8",
  ".ico": "image/x-icon"
};

function sendJson(response, status, payload) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(JSON.stringify(payload));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1024 * 1024) {
        reject(new Error("Request body too large"));
        request.destroy();
      }
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

function cleanString(value, maxLength = 500) {
  return String(value || "").trim().slice(0, maxLength);
}

function cleanCard(card) {
  return {
    title: cleanString(card.title, 80),
    position: cleanString(card.position, 30),
    image: cleanString(card.image, 200),
    message: cleanString(card.message, 1200),
    light: cleanString(card.light, 800),
    shadow: cleanString(card.shadow, 800),
    prompt: cleanString(card.prompt, 500),
    action: cleanString(card.action, 500)
  };
}

function normalizeReading(input) {
  const cards = Array.isArray(input.cards) ? input.cards.slice(0, 3).map(cleanCard) : [];
  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    firstName: cleanString(input.firstName, 80),
    email: cleanString(input.email, 180).toLowerCase(),
    question: cleanString(input.question, 500) || "What feels ready for a clearer look?",
    intention: cleanString(input.intention, 50) || "Clarity",
    tone: cleanString(input.tone, 50) || "Quiet",
    scope: cleanString(input.scope, 50) || "focused",
    path: cleanString(input.path, 50) || "focused",
    cards
  };
}

function validateReading(reading) {
  if (!reading.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reading.email)) {
    return "A valid email is required.";
  }

  if (reading.cards.length !== 3 || reading.cards.some((card) => !card.title || !card.position || !card.message)) {
    return "A complete three-card spread is required.";
  }

  return "";
}

async function ensureStorage() {
  await fs.mkdir(readingsDir, { recursive: true });
}

function isReadingId(id) {
  return /^[a-f0-9-]{36}$/i.test(id);
}

function getReadingFilePath(id) {
  if (!isReadingId(id)) {
    return null;
  }

  return path.join(readingsDir, `${id}.json`);
}

async function readReadingJson(id) {
  const filePath = getReadingFilePath(id);
  if (!filePath) {
    return null;
  }

  try {
    const file = await fs.readFile(filePath, "utf8");
    return JSON.parse(file);
  } catch (error) {
    if (error.code === "ENOENT") {
      return null;
    }

    throw error;
  }
}

async function writeReadingJson(reading) {
  const filePath = getReadingFilePath(reading.id);
  if (!filePath) {
    throw new Error("Invalid reading id.");
  }

  await fs.writeFile(filePath, JSON.stringify(reading, null, 2));
}

async function createReading(request, response) {
  try {
    const rawBody = await readBody(request);
    const input = JSON.parse(rawBody || "{}");
    const reading = normalizeReading(input);
    const error = validateReading(reading);

    if (error) {
      sendJson(response, 400, { error });
      return;
    }

    await ensureStorage();
    await writeReadingJson(reading);
    await fs.appendFile(leadsFile, `${JSON.stringify({
      id: reading.id,
      createdAt: reading.createdAt,
      firstName: reading.firstName,
      email: reading.email,
      question: reading.question,
      intention: reading.intention,
      tone: reading.tone,
      scope: reading.scope,
      path: reading.path,
      cards: reading.cards.map((card) => `${card.position}: ${card.title}`)
    })}\n`);

    sendJson(response, 201, {
      id: reading.id,
      resultUrl: `/result.html?id=${encodeURIComponent(reading.id)}`
    });
  } catch (error) {
    sendJson(response, 500, { error: "Could not save the reflection." });
  }
}

async function getReading(id, response) {
  if (!isReadingId(id)) {
    sendJson(response, 404, { error: "Reflection not found." });
    return;
  }

  try {
    const reading = await readReadingJson(id);
    if (!reading) {
      sendJson(response, 404, { error: "Reflection not found." });
      return;
    }

    sendJson(response, 200, { reading });
  } catch (error) {
    sendJson(response, 404, { error: "Reflection not found." });
  }
}

async function listVideoRequests(response) {
  try {
    await ensureStorage();
    const files = await fs.readdir(readingsDir);
    const requests = [];

    for (const file of files) {
      if (!file.endsWith(".json")) continue;
      const reading = JSON.parse(await fs.readFile(path.join(readingsDir, file), "utf8"));
      if (reading.videoRequest?.status !== "requested") continue;

      requests.push({
        id: reading.id,
        firstName: reading.firstName,
        email: reading.email,
        question: reading.question,
        intention: reading.intention,
        tone: reading.tone,
        scope: reading.scope,
        path: reading.path,
        cards: Array.isArray(reading.cards)
          ? reading.cards.map((card) => ({
              position: card.position,
              title: card.title,
              image: card.image
            }))
          : [],
        videoRequest: reading.videoRequest,
        resultUrl: `/result.html?id=${encodeURIComponent(reading.id)}#recommendation`
      });
    }

    requests.sort((a, b) => {
      const bTime = b.videoRequest?.requestedAt || "";
      const aTime = a.videoRequest?.requestedAt || "";
      return bTime.localeCompare(aTime);
    });

    sendJson(response, 200, { requests });
  } catch (error) {
    sendJson(response, 500, { error: "Could not load video requests." });
  }
}

async function createVideoRequest(request, response) {
  try {
    const rawBody = await readBody(request);
    const input = JSON.parse(rawBody || "{}");
    const readingId = cleanString(input.readingId, 80);
    const reading = await readReadingJson(readingId);

    if (!reading) {
      sendJson(response, 404, { error: "Reflection not found." });
      return;
    }

    const now = new Date().toISOString();
    const wasAlreadyRequested = reading.videoRequest?.status === "requested";
    reading.videoRequest = {
      ...(reading.videoRequest || {}),
      status: "requested",
      product: "personalized-card-video",
      amount: 1900,
      currency: "usd",
      source: "result_page",
      paymentStatus: "not_collected",
      fulfillmentStatus: "awaiting_payment_or_manual_followup",
      requestedAt: reading.videoRequest?.requestedAt || now,
      lastRequestedAt: now
    };
    delete reading.payment;
    delete reading.video;

    await writeReadingJson(reading);
    if (!wasAlreadyRequested) {
      await fs.appendFile(videoRequestsFile, `${JSON.stringify({
        id: reading.id,
        requestedAt: now,
        firstName: reading.firstName,
        email: reading.email,
        question: reading.question,
        intention: reading.intention,
        tone: reading.tone,
        scope: reading.scope,
        amount: 1900,
        currency: "usd",
        product: "personalized-card-video",
        status: "awaiting_payment_or_manual_followup",
        paymentStatus: "not_collected",
        cards: reading.cards.map((card) => `${card.position}: ${card.title}`)
      })}\n`);
    }

    sendJson(response, 200, {
      successUrl: `/success.html?id=${encodeURIComponent(reading.id)}`,
      message: "Video reading request saved."
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      sendJson(response, 400, { error: "Invalid JSON body." });
      return;
    }

    sendJson(response, 500, { error: "Could not save the video reading request." });
  }
}

async function serveStatic(request, response) {
  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === "/") pathname = "/index.html";

  const requestedPath = path.normalize(path.join(rootDir, pathname));
  if (!requestedPath.startsWith(rootDir)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const stat = await fs.stat(requestedPath);
    const filePath = stat.isDirectory() ? path.join(requestedPath, "index.html") : requestedPath;
    const extension = path.extname(filePath).toLowerCase();
    response.writeHead(200, {
      "Content-Type": mimeTypes[extension] || "application/octet-stream"
    });
    response.end(await fs.readFile(filePath));
  } catch (error) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);

  if (request.method === "POST" && url.pathname === "/api/readings") {
    await createReading(request, response);
    return;
  }

  if (
    request.method === "POST" &&
    (url.pathname === "/api/video-request" || url.pathname === "/api/video-requests")
  ) {
    await createVideoRequest(request, response);
    return;
  }

  const readingMatch = url.pathname.match(/^\/api\/readings\/([^/]+)$/);
  if (request.method === "GET" && readingMatch) {
    await getReading(readingMatch[1], response);
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/video-requests") {
    await listVideoRequests(response);
    return;
  }

  if (request.method === "GET" || request.method === "HEAD") {
    await serveStatic(request, response);
    return;
  }

  response.writeHead(405, { "Content-Type": "text/plain; charset=utf-8" });
  response.end("Method not allowed");
});

server.listen(port, () => {
  console.log(`True to You Tarot backend running at http://127.0.0.1:${port}`);
});
