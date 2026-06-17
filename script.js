const deckGrid = document.querySelector(".deck-grid");
const ritualPanel = document.querySelector(".ritual-panel");
const shuffleButton = document.querySelector("#shuffle-button");
const intentionChips = document.querySelectorAll("[data-intention]");
const toneChips = document.querySelectorAll("[data-tone]");
const scopeChips = document.querySelectorAll("[data-scope]");
const questionInput = document.querySelector("#question");
const firstNameInput = document.querySelector("#first-name");
const emailInput = document.querySelector("#email");
const spreadSlots = document.querySelectorAll(".spread-slot");
const resultTitle = document.querySelector(".reading-result h3");
const resultSummary = document.querySelector(".result-summary");
const resultCards = document.querySelector(".result-cards");
const leadForm = document.querySelector(".lead-form");
const formStatus = document.querySelector("[data-form-status]");

const positions = ["Root", "Mirror", "Movement"];
const positionHints = {
  Root: "underneath",
  Mirror: "truth",
  Movement: "next step"
};
const deck = window.CLEAR_FIELD_DECK || [];

let selectedIntention = "Clarity";
let selectedTone = "Quiet";
let selectedScope = "focused";
let shuffledDeck = [...deck];
let selectedCards = [];
let deckIsActive = false;

function getRecommendedPath() {
  if (selectedScope === "signature") return "signature";
  const deeperIntention = ["Release", "New chapter"].includes(selectedIntention);
  const deeperTone = ["Tangled", "Pressing", "Tired"].includes(selectedTone);
  return deeperIntention && deeperTone ? "signature" : "focused";
}

function renderDeck() {
  deckGrid.innerHTML = "";
  shuffledDeck.forEach((card, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "draw-card";
    button.setAttribute("aria-label", `Choose card ${index + 1}`);
    button.dataset.index = index;
    button.disabled = !deckIsActive;
    button.addEventListener("click", () => chooseCard(index, button));
    deckGrid.appendChild(button);
  });
}

function shuffleDeck() {
  selectedCards = [];
  deckIsActive = true;
  shuffledDeck = [...deck].sort(() => Math.random() - 0.5);
  ritualPanel.classList.remove("ready");
  spreadSlots.forEach((slot) => {
    slot.classList.remove("filled");
    slot.innerHTML = renderEmptySlot(slot.dataset.position);
  });
  resultCards.innerHTML = "";
  resultTitle.textContent = "Choose three cards.";
  const scopeText = selectedScope === "signature" ? "a deeper pattern" : "one focused question";
  resultSummary.textContent = `Your intention is ${selectedIntention}, the tone is ${selectedTone.toLowerCase()}, and you chose ${scopeText}. Hold the question gently, then select Root, Mirror, and Movement.`;
  ritualPanel.dataset.stage = "shuffle";
  renderDeck();
  window.setTimeout(() => {
    ritualPanel.dataset.stage = "select";
  }, 900);
}

function chooseCard(index, button) {
  if (!deckIsActive || selectedCards.length >= 3 || button.classList.contains("used")) return;

  const card = shuffledDeck[index];
  const position = positions[selectedCards.length];
  selectedCards.push({ ...card, position });

  button.classList.add("used");
  button.setAttribute("aria-label", `${card.title} selected for ${position}`);

  const slot = spreadSlots[selectedCards.length - 1];
  slot.classList.add("filled");
  slot.innerHTML = renderSpreadSlot(card, position);

  updateReading();
}

function renderSpreadSlot(card, position) {
  if (card.image) {
    return `
      <span>${position}</span>
      <img src="${card.image}" alt="${card.title} card face">
    `;
  }

  return `
    <span>${position}</span>
    <div class="slot-card-face">
      <strong>${card.title}</strong>
      <small>${card.suit || "Tarot"}</small>
    </div>
  `;
}

function renderEmptySlot(position) {
  return `<span>${position}</span><small>${positionHints[position]}</small>`;
}

function updateReading() {
  resultCards.innerHTML = selectedCards
    .map((card) => `
      <article class="result-card${card.image ? " has-image" : ""}">
        ${card.image ? `<img src="${card.image}" alt="${card.title} card face">` : ""}
        <div>
          <strong>${card.title}</strong>
          <span>${card.position} · Rider-Waite-Smith Tarot</span>
          <p>${card.message}</p>
          ${selectedCards.length === 3 ? `<p class="locked-note">The light/shadow notes and practice open on the result page.</p>` : ""}
        </div>
      </article>
    `)
    .join("");

  if (selectedCards.length < 3) {
    resultTitle.textContent = `${3 - selectedCards.length} card${selectedCards.length === 2 ? "" : "s"} left to choose.`;
    resultSummary.textContent = "Let the next card be selected slowly. The spread will synthesize once all three are revealed.";
    return;
  }

  const question = questionInput.value.trim() || "your question";
  const path = getRecommendedPath();
  const liveOption = path === "signature"
    ? "If the question still feels layered after that, the private page will point you toward the $333 Signature Angel-Led Tarot Reading."
    : "If you want to talk it through live, the private page will point you toward the $111 Focused Angel Reading.";
  ritualPanel.classList.add("ready");
  resultTitle.textContent = "Your three-card reflection is ready.";
  resultSummary.textContent = `Your Root card, ${selectedCards[0].title}, points to what may be underneath "${question}." Your Mirror card, ${selectedCards[1].title}, shows what may need a clearer look. Your Movement card, ${selectedCards[2].title}, offers the first practical shift. This is the first layer. The private page lets you get a short $19 video reading of these exact cards. ${liveOption}`;
  window.setTimeout(() => {
    leadForm.scrollIntoView({ behavior: "smooth", block: "center" });
    firstNameInput.focus({ preventScroll: true });
  }, 250);
}

function updatePressedState(group, activeChip) {
  group.forEach((item) => {
    const isActive = item === activeChip;
    item.classList.toggle("active", isActive);
    item.setAttribute("aria-pressed", String(isActive));
  });
}

intentionChips.forEach((chip) => {
  chip.setAttribute("aria-pressed", String(chip.classList.contains("active")));
  chip.addEventListener("click", () => {
    updatePressedState(intentionChips, chip);
    selectedIntention = chip.dataset.intention;
    if (selectedCards.length) updateReading();
  });
});

toneChips.forEach((chip) => {
  chip.setAttribute("aria-pressed", String(chip.classList.contains("active")));
  chip.addEventListener("click", () => {
    updatePressedState(toneChips, chip);
    selectedTone = chip.dataset.tone;
    if (selectedCards.length) updateReading();
  });
});

scopeChips.forEach((chip) => {
  chip.setAttribute("aria-pressed", String(chip.classList.contains("active")));
  chip.addEventListener("click", () => {
    updatePressedState(scopeChips, chip);
    selectedScope = chip.dataset.scope;
    if (selectedCards.length) updateReading();
  });
});

shuffleButton.addEventListener("click", shuffleDeck);

function setFormStatus(message) {
  if (formStatus) formStatus.textContent = message;
}

leadForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (selectedCards.length < 3) {
    resultTitle.textContent = "Choose all three cards first.";
    resultSummary.textContent = "The email step works best after the Root, Mirror, and Movement cards have been revealed.";
    return;
  }

  const payload = {
    firstName: firstNameInput.value.trim(),
    email: emailInput.value.trim(),
    question: questionInput.value.trim() || "What feels ready for a clearer look?",
    intention: selectedIntention,
    tone: selectedTone,
    scope: selectedScope,
    path: getRecommendedPath(),
    cards: selectedCards.map((card) => ({
      title: card.title,
      position: card.position,
      image: card.image,
      message: card.message,
      light: card.light,
      shadow: card.shadow,
      prompt: card.prompt,
      action: card.action
    }))
  };

  window.sessionStorage.setItem("clearFieldResult", JSON.stringify(payload));
  setFormStatus("Opening your reflection...");

  try {
    const response = await fetch("/api/readings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || "Could not save the reflection.");
    }

    const saved = await response.json();
    window.location.href = saved.resultUrl || "result.html";
  } catch (error) {
    setFormStatus("Backend is not connected, so this preview opened locally.");
    window.setTimeout(() => {
      window.location.href = "result.html";
    }, 700);
  }
});

renderDeck();
