const storedResult = window.sessionStorage.getItem("clearFieldResult");
let result = null;

try {
  result = storedResult ? JSON.parse(storedResult) : null;
} catch (error) {
  result = null;
}

const fallbackResult = {
  firstName: "",
  email: "",
  question: "What feels ready for a clearer look?",
  intention: "Clarity",
  tone: "Quiet",
  scope: "focused",
  path: "focused",
  cards: []
};

let data = { ...fallbackResult, ...(result || {}) };
const visualDeck = window.CLEAR_FIELD_DECK || [];
const placeholderCards = visualDeck.slice(1, 4).map((card, index) => ({
  ...card,
  position: ["Root", "Mirror", "Movement"][index]
}));
let hasStoredPull = false;
let activeCards = placeholderCards;

function refreshDerivedState() {
  hasStoredPull = Boolean(
    data &&
      Array.isArray(data.cards) &&
      data.cards.length === 3 &&
      data.cards.every((card) => card && card.title && card.position && card.message)
  );
  activeCards = hasStoredPull ? data.cards : placeholderCards;
}

refreshDerivedState();

const resultTitleByIntention = {
  Clarity: "Your cards are giving the question a cleaner shape.",
  Decision: "Your cards are pointing to the choice in front of you.",
  Release: "Your cards are naming what may be ready to loosen.",
  "Self-trust": "Your cards are asking you to listen more quietly.",
  "New chapter": "Your cards are meeting you at the threshold."
};

const coreInsightByTone = {
  Quiet: "You selected a quiet tone, so read this slowly. Let the card images work as a mirror before you decide what fits.",
  Tender: "You selected a tender tone. Let the reading stay close to what feels true without making it bigger than it needs to be.",
  Tangled: "You selected a tangled tone. This spread can be used to separate the practical question from the pressure around it.",
  Pressing: "You selected a pressing tone. Let the reading point to one steady action instead of a rushed conclusion.",
  Tired: "You selected a tired tone. Let the reading show what can be made simpler before you add anything else."
};

const pathContent = {
  focused: {
    title: "Bring the question into a private reading.",
    copy: "If this spread brings up something you want to talk through, the $111 Focused Angel Reading gives one question more room with Kasey live.",
    label: "Focused Angel Reading",
    price: "$111",
    time: "30 minute private session",
    cta: "Book the $111 Focused Reading",
    href: "mailto:hello@tranquilitywellnessandyoga.com?subject=$111%20Focused%20Angel%20Reading",
    bullets: [
      "One primary question",
      "Root / Mirror / Movement reading with angelic guidance",
      "Reflective interpretation without fixed-future prediction",
      "One grounded next step to integrate after the session"
    ]
  },
  signature: {
    title: "Give the question more room.",
    copy: "If this spread feels connected to a larger pattern, the $333 Signature Angel-Led Tarot Reading gives Kasey time to stay with the cards, the context, and the integration afterward.",
    label: "Signature Angel-Led Tarot Reading",
    price: "$333",
    time: "75-90 minute private session",
    cta: "Book the $333 Signature Reading",
    href: "mailto:hello@tranquilitywellnessandyoga.com?subject=$333%20Signature%20Angel-Led%20Tarot%20Reading",
    bullets: [
      "Pre-session question and intention intake",
      "Custom tarot spread with angel-led guidance",
      "Guided reflection and simple release practice",
      "Written Clarity Map within 72 hours"
    ]
  }
};

function setText(selector, text) {
  const element = document.querySelector(selector);
  if (element) element.textContent = text;
}

function getReadingId() {
  return new URLSearchParams(window.location.search).get("id") || "";
}

async function loadReadingById() {
  const id = getReadingId();
  if (!id) return;

  try {
    const response = await fetch(`/api/readings/${encodeURIComponent(id)}`);
    if (!response.ok) return;
    const payload = await response.json();
    if (!payload.reading) return;
    result = payload.reading;
    data = { ...fallbackResult, ...payload.reading };
    window.sessionStorage.setItem("clearFieldResult", JSON.stringify(data));
    refreshDerivedState();
  } catch (error) {
    refreshDerivedState();
  }
}

function getToneText() {
  return data.tone.toLowerCase();
}

function getRevealName() {
  if (!activeCards.length) return "The Clear Field Opening";
  const movement = activeCards[2];
  return movement ? `${movement.title} Opening` : "The Clear Field Opening";
}

function getResultTitle(root, mirror, movement) {
  if (!hasStoredPull || !movement) {
    return resultTitleByIntention[data.intention] || "Here is what your spread is asking you to notice.";
  }

  return `${movement.title} is where the spread starts to move.`;
}

function displayText(value) {
  return String(value || "")
    .replace("nervous-system softness", "inner softness")
    .replace("Nervous-system softness", "Inner softness");
}

function cleanCardText(value, fallback) {
  const text = displayText(value).trim();
  if (!text || /^(root|mirror|movement) message$/i.test(text) || /^action$/i.test(text)) {
    return fallback;
  }
  return text;
}

function getQuestionSentence() {
  const question = String(data.question || "").trim();
  if (!question) return "What feels ready for a clearer look?";
  return /[?.!]$/.test(question) ? question : `${question}.`;
}

function renderEmptyState() {
  document.body.classList.add("result-empty-state");
  setText("[data-reveal-kicker]", "Start with the card pull");
  setText("[data-reveal-name]", "Your reflection is waiting");
  setText("[data-result-title]", "Pull three cards to open your reflection.");
  setText("[data-result-archetype]", "Root / Mirror / Movement");
  setText("[data-result-lede]", "This page opens after you choose an intention, pull three cards, and send the reflection to yourself.");
  setText("[data-core-insight]", "Once your cards are pulled, this space will hold the message, prompts, and suggested next step.");
  setText("[data-result-question]", "Begin with one question you can sit with honestly.");
  setText("[data-reading-title]", "Your card thread will appear here.");
  const actions = document.querySelector(".result-actions");
  if (actions) {
    actions.innerHTML = `<a class="button primary" href="index.html#pull">Pull three cards</a>`;
  }
}

function getCardKeyline(card) {
  const keylines = {
    Root: "The root of the question.",
    Mirror: "The pattern asking to be seen clearly.",
    Movement: "The next shift that changes the reading."
  };
  return keylines[card.position] || "The part of the message asking for attention.";
}

function renderCards() {
  const container = document.querySelector("[data-result-cards]");
  if (!container) return;

  if (!hasStoredPull) {
    container.innerHTML = `
      <article class="result-empty">
        <h3>Start with the free card pull.</h3>
        <p>Your deeper reflection will appear here after you pull three cards and send it to yourself.</p>
        <a class="button primary" href="index.html#pull">Pull three cards</a>
      </article>
    `;
    return;
  }

  container.innerHTML = data.cards.map((card) => `
    <article class="deep-card">
      ${card.image ? `<img src="${card.image}" alt="${card.title} card face">` : ""}
      <div>
        <p class="mini-label">${card.position}</p>
        <h3>${card.title}</h3>
        <p class="card-keyline">${getCardKeyline(card)}</p>
        <p>${cleanCardText(card.message, "This card is holding one layer of the spread. The full reading looks at its symbols, its position, and how it changes the cards around it.")}</p>
        <a class="card-read-more" href="#recommendation">Request Kasey's take on the spread</a>
      </div>
    </article>
  `).join("");
}

function renderMiniSpread() {
  const container = document.querySelector("[data-mini-spread]");
  if (!container) return;

  const positions = ["Root", "Mirror", "Movement"];
  const cards = hasStoredPull ? activeCards : [];

  container.innerHTML = positions.map((position, index) => {
    const card = cards[index];
    if (!card) {
      return `
        <div class="mini-spread-card empty">
          <span>${position}</span>
        </div>
      `;
    }

    return `
      <figure class="mini-spread-card">
        <img src="${card.image}" alt="${card.title} tarot card">
        <figcaption>
          <span>${card.position || position}</span>
          <strong>${card.title}</strong>
        </figcaption>
      </figure>
    `;
  }).join("");
}

function renderVideoPreview() {
  const container = document.querySelector("[data-video-preview-cards]");
  if (!container) return;

  const positions = ["Root", "Mirror", "Movement"];
  const cards = hasStoredPull ? activeCards : placeholderCards;
  container.innerHTML = cards.map((card, index) => `
    <figure class="video-preview-card">
      ${card.image ? `<img src="${card.image}" alt="${card.title} tarot card">` : ""}
      <figcaption>
        <span>${card.position || positions[index]}</span>
        <strong>${card.title}</strong>
      </figcaption>
    </figure>
  `).join("");

  const [root, mirror, movement] = cards;
  if (root && mirror && movement) {
    setText("[data-video-preview-title]", `A short read of ${root.title}, ${mirror.title}, and ${movement.title}`);
  }
}

function renderPath() {
  const path = pathContent[data.path] || pathContent.focused;
  setText("[data-path-title]", path.title);
  setText("[data-path-copy]", path.copy);
  setText("[data-path-label]", path.label);
  setText("[data-path-price]", path.price);
  setText("[data-path-time]", path.time);

  const cta = document.querySelector("[data-path-cta]");
  if (cta) {
    cta.textContent = path.cta;
    cta.href = buildBookingHref(path);
  }

  const list = document.querySelector("[data-path-list]");
  if (list) list.innerHTML = path.bullets.map((item) => `<li>${item}</li>`).join("");

  renderUnlockOffer();
}

function renderUnlockOffer() {
  if (!hasStoredPull) return;
  const [root, mirror, movement] = activeCards;
  const thread = `${root.title}, ${mirror.title}, and ${movement.title}`;
  setText(
    "[data-unlock-copy]",
    `The free pull gives you the shape of the reading. For $19, Kasey can record a short private read of ${thread}: the pattern between them, the card she would stay with first, and the one thing worth carrying with you.`
  );
  setText(
    "[data-unlock-card-thread]",
    `A recorded reading of ${thread}, usually around 2-3 minutes and based on the question you asked.`
  );

  const cta = document.querySelector("[data-unlock-cta]");
  if (!cta) return;
  cta.addEventListener("click", requestVideoReading);
  applyVideoRequestState();
}

function setRequestStatus(message) {
  setText("[data-request-status]", message);
}

function applyVideoRequestState() {
  if (data.videoRequest?.status !== "requested") return;
  const cta = document.querySelector("[data-unlock-cta]");
  if (cta) {
    cta.textContent = "Request saved";
    cta.setAttribute("disabled", "disabled");
  }
  setRequestStatus("");
}

function buildVideoInquiryHref() {
  const cards = activeCards.map((card) => `${card.position}: ${card.title}`).join("\n");
  const body = [
    "Hi Kasey,",
    "",
    "I'd like to request the $19 short private video reading for this three-card spread.",
    "",
    `Question: ${data.question}`,
    `Intention: ${data.intention}`,
    `Tone: ${data.tone}`,
    "",
    "Cards:",
    cards,
    "",
    "Please send me the payment and delivery details."
  ].join("\n");

  return `mailto:hello@tranquilitywellnessandyoga.com?subject=${encodeURIComponent("$19 short private video reading")}&body=${encodeURIComponent(body)}`;
}

async function requestVideoReading() {
  const cta = document.querySelector("[data-unlock-cta]");
  const readingId = getReadingId();

  if (!readingId) {
    window.location.href = buildVideoInquiryHref();
    return;
  }

  try {
    if (cta) cta.setAttribute("disabled", "disabled");
    setRequestStatus("Saving your request...");
    const response = await fetch("/api/video-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ readingId })
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || !payload.successUrl) throw new Error(payload.error || "Request unavailable.");
    if (cta) cta.textContent = "Request saved";
    setRequestStatus(payload.message || "Request saved.");
    window.location.href = payload.successUrl;
  } catch (error) {
    setRequestStatus("The request could not be saved here. Opening an inquiry email instead.");
    window.location.href = buildVideoInquiryHref();
  } finally {
    if (cta && data.videoRequest?.status !== "requested") cta.removeAttribute("disabled");
  }
}

function buildBookingHref(path) {
  if (!hasStoredPull) return path.href;
  const cards = activeCards.map((card) => `${card.position}: ${card.title}`).join("\n");
  const body = [
    "Hi Kasey,",
    "",
    `I'd like to inquire about: ${path.label}`,
    "",
    `Question: ${data.question}`,
    `Intention: ${data.intention}`,
    `Tone: ${data.tone}`,
    `Support depth: ${data.scope === "signature" ? "A deeper pattern" : "One focused question"}`,
    "",
    "Cards:",
    cards,
    "",
    "Please let me know the next step for booking."
  ].join("\n");

  return `${path.href}&body=${encodeURIComponent(body)}`;
}

function renderSummary() {
  if (!hasStoredPull) {
    renderEmptyState();
    return;
  }

  const name = data.firstName ? `${data.firstName}, this` : "This";
  const scopeText = data.scope === "signature" ? "A deeper pattern" : "One focused question";
  const [root, mirror, movement] = activeCards;
  const title = getResultTitle(root, mirror, movement);
  const revealName = getRevealName();

  setText("[data-reveal-name]", revealName);
  setText("[data-result-intention]", data.intention);
  setText("[data-result-tone]", data.tone);
  setText("[data-result-scope]", scopeText);
  setText("[data-result-question]", data.question);
  setText("[data-result-title]", title);
  setText("[data-result-archetype]", `${revealName} · ${root?.title || "Root"} / ${mirror?.title || "Mirror"} / ${movement?.title || "Movement"}`);
  if (hasStoredPull) {
    setText("[data-result-lede]", `${name} is the first layer of your Root / Mirror / Movement spread: the question, the tone you named, and the three cards that came forward. Read it once, then notice what still wants a human read.`);
  }
  renderSynthesis(scopeText);
}

function renderSynthesis(scopeText) {
  if (!hasStoredPull || !activeCards.length) return;
  const [root, mirror, movement] = activeCards;
  const scopeLine = data.path === "signature"
    ? "Because you chose the deeper-pattern path, read this as a larger thread that may need time, reflection, and integration."
    : "Because you chose one focused question, read this as a clean snapshot rather than a whole-life verdict.";
  const toneLine = data.tone === "Pressing"
    ? "The pressing tone does not have to become speed; it may just mean the question wants one clean next move."
    : `The ${data.tone.toLowerCase()} tone suggests the reading may land best when it has a little space around it.`;

  setText(
    "[data-synthesis-copy]",
    `Start with "${getQuestionSentence()}" ${root.title} sets the root of the spread, ${mirror.title} shows the mirror, and ${movement.title} is the movement card: the place where the reading starts to become usable. ${toneLine} ${scopeLine}`
  );
  setText("[data-core-insight]", coreInsightByTone[data.tone] || "Start with the card that catches your eye first.");
  setText("[data-insight-tension]", `${root.title} is the root signal: notice what this card is placing at the center of the question.`);
  setText("[data-insight-release]", `${mirror.title} is the mirror truth: let it show what can be named plainly before you decide what to do with it.`);
  setText(
    "[data-insight-action]",
    `${movement.title} offers the movement practice: ${cleanCardText(movement.action, "choose one small step that makes the reading real without forcing an outcome.")}`
  );
  setText("[data-reading-title]", `The ${root.title} / ${mirror.title} / ${movement.title} thread.`);
  setText("[data-guide-note]", getGuideNote(scopeText));
}

function getGuideNote(scopeText) {
  if (data.path === "signature") {
    return "When I see a spread like this, I start by reading the cards together: what repeats, what pushes back, and what the final card seems to be asking you to try in real life.";
  }

  return "When I see a spread like this, I stay close to the cards on the table: what each one is showing, how they speak to each other, and the one part worth carrying with you.";
}

async function initResultPage() {
  await loadReadingById();
  setRequestStatus("");
  renderSummary();
  renderMiniSpread();
  renderVideoPreview();
  renderCards();
  renderPath();
}

initResultPage();
