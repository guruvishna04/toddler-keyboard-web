let targetWord = "dada";
const defaultColor = "#e53935";
const rainbowColors = ["#e53935", "#fb8c00", "#fdd835", "#43a047", "#1e88e5", "#8e24aa"];

let typedLetters = [];
let selectedColor = defaultColor;
let colorMode = "single";
let capsLockOn = false;
let soundEnabled = true;
let audioContext = null;

const targetWordDisplay = document.querySelector("#target-word");
const typedDisplay = document.querySelector("#typed-display");
const helperTruck = document.querySelector("#helper-truck");
const helperMessageBubble = document.querySelector("#helper-message-bubble");
const helpTypeButton = document.querySelector("#help-type-button");
const helperMessage = document.querySelector("#helper-message");
const progressDots = document.querySelector(".progress-dots");
const wordInput = document.querySelector("#word-input");
const useWordButton = document.querySelector("#use-word-button");
const presetButtons = Array.from(document.querySelectorAll(".preset-button"));
const colorButtons = Array.from(document.querySelectorAll(".color-button"));
const keyButtons = Array.from(document.querySelectorAll(".key-button"));
const clearButton = document.querySelector("#clear-button");
const backspaceButton = document.querySelector("#backspace-button");
const capsToggle = document.querySelector("#caps-toggle");
const soundToggle = document.querySelector("#sound-toggle");
const fullscreenButton = document.querySelector("#fullscreen-button");
const celebrationLayer = document.querySelector("#celebration-layer");
const wordStage = document.querySelector(".word-stage");

function normalizeWord(value, fallback = "dada") {
  const lettersOnly = value.replace(/[^a-z]/gi, "");
  return lettersOnly.slice(0, 8) || fallback;
}

function wordSizeForLength(length) {
  if (length <= 4) {
    return "clamp(5rem, 13vw, 11rem)";
  }
  if (length <= 6) {
    return "clamp(3.4rem, 7vw, 6rem)";
  }
  return "clamp(2.8rem, 5.8vw, 5rem)";
}

function syncWordSize() {
  const size = wordSizeForLength(targetWord.length);
  targetWordDisplay.style.fontSize = size;
  typedDisplay.style.setProperty("--typed-letter-size", size);
}

function displayLetterForTarget(rawLetter, index) {
  if (rawLetter === rawLetter.toLocaleUpperCase()) {
    return rawLetter.toLocaleUpperCase();
  }
  return rawLetter.toLocaleLowerCase();
}

function getAudioContext() {
  if (!audioContext) {
    const Context = window.AudioContext || window.webkitAudioContext;
    if (!Context) {
      return null;
    }
    audioContext = new Context();
  }
  return audioContext;
}

function playTone(frequency, duration = 0.11) {
  if (!soundEnabled) {
    return;
  }

  const context = getAudioContext();
  if (!context) {
    return;
  }

  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = "sine";
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(0.0001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.08, context.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + duration + 0.02);
}

function renderProgressDots() {
  progressDots.innerHTML = "";
  Array.from(targetWord).forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.toggle("done", index < typedLetters.length);
    progressDots.appendChild(dot);
  });
}

function renderTypedLetters() {
  typedDisplay.innerHTML = "";
  typedDisplay.classList.toggle("empty", typedLetters.length === 0);
  typedDisplay.dataset.placeholder = `tap ${targetWord[0].toLocaleUpperCase()}`;

  typedLetters.forEach(({ letter, displayLetter, color }, index) => {
    const span = document.createElement("span");
    span.className = "typed-letter";
    span.textContent = displayLetterForTarget(displayLetter || letter, index);
    span.style.color = color;
    typedDisplay.appendChild(span);
  });

  renderProgressDots();
}

function colorForLetter(index) {
  if (colorMode === "rainbow") {
    return rainbowColors[index % rainbowColors.length];
  }
  return selectedColor;
}

function typedWord() {
  return typedLetters.map((item) => item.letter).join("").toLocaleLowerCase();
}

function expectedWord() {
  return targetWord.toLocaleLowerCase();
}

function updateNextKeyHighlight() {
  const nextLetter = expectedWord()[typedLetters.length] || "";
  keyButtons.forEach((button) => {
    button.classList.toggle("next-key", button.dataset.key === nextLetter);
    button.classList.toggle("key-focus", expectedWord().includes(button.dataset.key));
  });
}

function updateKeyCase() {
  keyButtons.forEach((button) => {
    const key = button.dataset.key || "";
    button.textContent = capsLockOn ? key.toLocaleUpperCase() : key.toLocaleLowerCase();
  });
  capsToggle.setAttribute("aria-pressed", String(capsLockOn));
}

function setHelperMood(kind = "ready") {
  helperTruck.classList.remove("ready", "good", "try", "helping");
  helperTruck.classList.add(kind);

  if (kind === "good") {
    helperMessageBubble.textContent = "Nice letter!";
    return;
  }
  if (kind === "try") {
    helperMessageBubble.textContent = "Try again.";
    return;
  }
  if (kind === "helping") {
    helperMessageBubble.textContent = "I will type it.";
    return;
  }
  helperMessageBubble.textContent = "I can help!";
}

function updatePresetSelection() {
  presetButtons.forEach((button) => {
    button.classList.toggle("selected", button.dataset.word === targetWord);
  });
}

function nextInstruction() {
  const next = targetWord[typedLetters.length] || targetWord[0];
  return `Tap ${next.toLocaleUpperCase()}`;
}

function checkCompletion() {
  const current = typedWord();
  const expected = expectedWord();

  updateNextKeyHighlight();

  if (current === expected) {
    helperMessage.textContent = `You typed ${targetWord}!`;
    setHelperMood("good");
    celebrate();
    playTone(660, 0.16);
    setTimeout(() => playTone(880, 0.18), 120);
    return;
  }

  if (expected.startsWith(current)) {
    helperMessage.textContent = nextInstruction();
    setHelperMood("good");
  } else {
    helperMessage.textContent = `Try ${targetWord.split("").join(" ")}`;
    setHelperMood("try");
  }
}

function handleLetter(letter) {
  if (!/^[a-z]$/i.test(letter)) {
    return;
  }

  if (typedLetters.length >= targetWord.length) {
    typedLetters = [];
  }

  const rawLetter = capsLockOn ? letter.toLocaleUpperCase() : letter.toLocaleLowerCase();
  typedLetters.push({
    letter: rawLetter.toLocaleLowerCase(),
    displayLetter: rawLetter,
    color: colorForLetter(typedLetters.length),
  });

  renderTypedLetters();
  pressVisual(rawLetter);
  playTone(expectedWord().includes(rawLetter) ? 520 : 360);
  checkCompletion();
}

function setTargetWord(value) {
  targetWord = normalizeWord(value);
  targetWordDisplay.textContent = targetWord;
  targetWordDisplay.setAttribute("aria-label", `Target word ${targetWord}`);
  wordInput.value = targetWord;
  typedLetters = [];
  syncWordSize();
  renderTypedLetters();
  updatePresetSelection();
  helperMessage.textContent = nextInstruction();
  setHelperMood("ready");
  updateNextKeyHighlight();
}

function applyCustomWord() {
  setTargetWord(wordInput.value);
}

function pressVisual(letter) {
  const button = keyButtons.find((item) => item.dataset.key === letter);
  if (!button) {
    return;
  }

  button.classList.add("pressed");
  setTimeout(() => button.classList.remove("pressed"), 140);
}

function chooseColor(button) {
  colorMode = button.dataset.colorMode === "rainbow" ? "rainbow" : "single";
  selectedColor = button.dataset.color || selectedColor || defaultColor;
  colorButtons.forEach((item) => item.classList.toggle("selected", item === button));
  playTone(440, 0.08);
}

function clearTypedLetters() {
  typedLetters = [];
  renderTypedLetters();
  helperMessage.textContent = nextInstruction();
  setHelperMood("ready");
  updateNextKeyHighlight();
  playTone(300, 0.08);
}

function removeLastLetter() {
  typedLetters.pop();
  renderTypedLetters();
  checkCompletion();
  playTone(260, 0.08);
}

function celebrate() {
  wordStage.classList.remove("complete");
  void wordStage.offsetWidth;
  wordStage.classList.add("complete");

  const colors = ["#e53935", "#1e88e5", "#43a047", "#fdd835", "#8e24aa"];
  const symbols = ["★", "●", "◆", "▲"];

  for (let index = 0; index < 18; index += 1) {
    const spark = document.createElement("span");
    spark.className = "spark";
    spark.textContent = symbols[index % symbols.length];
    spark.style.left = `${12 + Math.random() * 76}%`;
    spark.style.top = `${60 + Math.random() * 28}%`;
    spark.style.color = colors[index % colors.length];
    spark.style.animationDelay = `${Math.random() * 120}ms`;
    celebrationLayer.appendChild(spark);
    setTimeout(() => spark.remove(), 1100);
  }
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  soundToggle.textContent = soundEnabled ? "Sound On" : "Sound Off";
  soundToggle.setAttribute("aria-pressed", String(soundEnabled));
  if (soundEnabled) {
    playTone(500, 0.08);
  }
}

function toggleCapsLock() {
  capsLockOn = !capsLockOn;
  updateKeyCase();
  playTone(capsLockOn ? 560 : 360, 0.08);
}

function animateHelperTyping() {
  if (typedLetters.length >= targetWord.length) {
    clearTypedLetters();
  }

  setHelperMood("helping");
  let index = typedLetters.length;
  const helperTimer = window.setInterval(() => {
    if (index >= targetWord.length) {
      window.clearInterval(helperTimer);
      checkCompletion();
      return;
    }
    handleLetter(targetWord[index].toLocaleLowerCase());
    index += 1;
  }, 420);
}

async function toggleFullscreen() {
  if (!document.fullscreenElement) {
    await document.documentElement.requestFullscreen();
    fullscreenButton.textContent = "Exit";
    return;
  }

  await document.exitFullscreen();
  fullscreenButton.textContent = "Full";
}

wordInput.addEventListener("input", () => {
  const cursorWord = normalizeWord(wordInput.value, "");
  if (cursorWord !== wordInput.value) {
    wordInput.value = cursorWord;
  }
  if (cursorWord) {
    setTargetWord(cursorWord);
  }
});

wordInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    setTargetWord(wordInput.value);
  }
});

useWordButton.addEventListener("click", applyCustomWord);

presetButtons.forEach((button) => {
  button.addEventListener("click", () => setTargetWord(button.dataset.word));
});

colorButtons.forEach((button) => {
  button.addEventListener("click", () => chooseColor(button));
});

keyButtons.forEach((button) => {
  button.addEventListener("click", () => handleLetter(button.dataset.key));
});

clearButton.addEventListener("click", clearTypedLetters);
backspaceButton.addEventListener("click", removeLastLetter);
capsToggle.addEventListener("click", toggleCapsLock);
helpTypeButton.addEventListener("click", animateHelperTyping);
soundToggle.addEventListener("click", toggleSound);
fullscreenButton.addEventListener("click", () => {
  toggleFullscreen().catch(() => {
    helperMessage.textContent = "Fullscreen needs the browser button";
  });
});

window.addEventListener("keydown", (event) => {
  if (document.activeElement === wordInput) {
    return;
  }

  if (event.metaKey || event.ctrlKey || event.altKey) {
    return;
  }

  if (event.key === "Backspace") {
    event.preventDefault();
    removeLastLetter();
    return;
  }

  if (event.key === "Escape") {
    clearTypedLetters();
    return;
  }

  if (event.key === "CapsLock") {
    toggleCapsLock();
    return;
  }

  if (/^[a-z]$/i.test(event.key)) {
    handleLetter(event.key.toLocaleLowerCase());
  }
});

setTargetWord(targetWord);
updateKeyCase();
