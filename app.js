let targetWord = "dada";
const defaultColor = "#e53935";
const rainbowColors = ["#e53935", "#fb8c00", "#fdd835", "#43a047", "#1e88e5", "#8e24aa"];
const smoothVoiceDefaults = {
  letterRate: 0.66,
  wordRate: 0.72,
  pitch: 1.05,
};
const wordBank = {
  "en-US": [
    "dada", "mama", "papa", "baby", "cat", "dog", "apple", "milk", "ball", "teddy",
    "happy", "truck", "car", "bus", "train", "boat", "plane", "book", "star", "moon",
    "sun", "tree", "home", "house", "bed", "bath", "cup", "spoon", "plate", "bowl",
    "shoe", "sock", "hat", "coat", "shirt", "pants", "hand", "foot", "nose", "eye",
    "ear", "hair", "smile", "laugh", "play", "jump", "run", "walk", "clap", "wave",
    "hug", "kiss", "nap", "sleep", "wake", "light", "door", "chair", "table", "block",
    "cube", "doll", "drum", "bell", "carrot", "grape", "melon", "berry", "banana", "orange",
    "water", "juice", "bread", "rice", "pasta", "cookie", "cake", "toast", "cheese", "yogurt",
    "flower", "cloud", "rain", "snow", "leaf", "grass", "sand", "beach", "park", "slide",
    "swing", "friend", "share", "kind", "please", "thank", "yes", "no", "up", "down",
  ],
  "es-ES": [
    "papa", "mama", "bebe", "gato", "perro", "casa", "sol", "luna", "auto", "leche",
    "bola", "mano", "agua", "pan", "arroz", "sopa", "uva", "melon", "pera", "manzana",
    "banana", "queso", "yogur", "galleta", "torta", "mesa", "silla", "cama", "puerta", "luz",
    "flor", "nube", "lluvia", "nieve", "hoja", "pasto", "playa", "arena", "parque", "tren",
    "bus", "barco", "avion", "libro", "estrela", "oso", "pato", "pez", "rana", "boca",
    "pie", "nariz", "ojo", "oreja", "pelo", "risa", "jugar", "saltar", "correr", "caminar",
    "aplauso", "ola", "abrazo", "beso", "siesta", "dormir", "despi", "vaso", "plato", "taza",
    "cuchara", "zapato", "media", "gorro", "abrigo", "camisa", "pantalon", "bloque", "cubo", "muneca",
    "tambor", "campana", "carro", "jugo", "tostada", "pasta", "pastel", "amigo", "dulce", "suave",
    "grande", "chico", "rojo", "azul", "verde", "amarillo", "morada", "hola", "gracias", "vamos",
  ],
  "fr-FR": [
    "papa", "maman", "bebe", "chat", "chien", "maison", "soleil", "lune", "auto", "lait",
    "balle", "main", "eau", "pain", "riz", "soupe", "raisin", "melon", "poire", "pomme",
    "banane", "fromage", "yaourt", "biscuit", "gateau", "table", "chaise", "lit", "porte", "lumiere",
    "fleur", "nuage", "pluie", "neige", "feuille", "herbe", "plage", "sable", "parc", "train",
    "bus", "bateau", "avion", "livre", "etoile", "ours", "canard", "poisson", "grenouil", "pied",
    "nez", "oeil", "oreille", "cheveu", "rire", "jouer", "sauter", "courir", "marcher", "clap",
    "vague", "calin", "bisou", "sieste", "dodo", "reveil", "verre", "assiete", "tasse", "cuillere",
    "soulier", "chauson", "bonnet", "manteau", "chemise", "pantalon", "bloc", "cube", "poupee", "tambour",
    "cloche", "camion", "jus", "toast", "pates", "ami", "doux", "grand", "petit", "rouge",
    "bleu", "vert", "jaune", "violet", "bonjour", "merci", "oui", "non", "haut", "bas",
  ],
  "de-DE": [
    "papa", "mama", "baby", "katze", "hund", "haus", "sonne", "mond", "auto", "milch",
    "ball", "hand", "wasser", "brot", "reis", "suppe", "traube", "melon", "birne", "apfel",
    "banane", "kase", "joghurt", "keks", "kuchen", "tisch", "stuhl", "bett", "tur", "licht",
    "blume", "wolke", "regen", "schnee", "blatt", "gras", "strand", "sand", "park", "zug",
    "bus", "boot", "flug", "buch", "stern", "bar", "ente", "fisch", "frosch", "fuss",
    "nase", "auge", "ohr", "haar", "lachen", "spielen", "hupfen", "rennen", "gehen", "klatsch",
    "winken", "kuschel", "kuss", "nicker", "schlaf", "wach", "becher", "teller", "tasse", "loeffel",
    "schuh", "socke", "mutze", "mantel", "hemd", "hose", "block", "wurfel", "puppe", "trommel",
    "glocke", "laster", "saft", "toast", "nudeln", "freund", "weich", "gross", "klein", "rot",
    "blau", "grun", "gelb", "lila", "hallo", "danke", "ja", "nein", "hoch", "runter",
  ],
};

let typedLetters = [];
let selectedColor = defaultColor;
let colorMode = "single";
let capsLockOn = false;
let soundEnabled = true;
let activeLanguage = "en-US";
let wordIndex = 0;
let practiceMode = "list";
let advanceTimer = null;
let audioContext = null;
let speechVoices = [];

const targetWordDisplay = document.querySelector("#target-word");
const wordInput = targetWordDisplay;
const typedDisplay = document.querySelector("#typed-display");
const helperTruck = document.querySelector("#helper-truck");
const helperMessageBubble = document.querySelector("#helper-message-bubble");
const helpTypeButton = document.querySelector("#help-type-button");
const helperMessage = document.querySelector("#tap-prompt");
const progressDots = document.querySelector(".progress-dots");
const colorButtons = Array.from(document.querySelectorAll(".color-button"));
const keyButtons = Array.from(document.querySelectorAll(".key-button"));
const clearButton = document.querySelector("#clear-button");
const backspaceButton = document.querySelector("#backspace-button");
const capsToggle = document.querySelector("#caps-toggle");
const soundToggle = document.querySelector("#sound-toggle");
const fullscreenButton = document.querySelector("#fullscreen-button");
const languageSelect = document.querySelector("#language-select");
const celebrationLayer = document.querySelector("#celebration-layer");
const wordStage = document.querySelector(".word-stage");

function normalizeWord(value, fallback = "dada") {
  const lettersOnly = value.replace(/[^a-z]/gi, "");
  return lettersOnly.slice(0, 8) || fallback;
}

function wordListForLanguage(language) {
  return wordBank[language] || wordBank["en-US"];
}

function listWordAt(index) {
  const words = wordListForLanguage(activeLanguage);
  return words[index % words.length];
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

function loadSpeechVoices() {
  if (!("speechSynthesis" in window)) {
    return;
  }
  speechVoices = window.speechSynthesis.getVoices();
}

function voiceForLanguage(language) {
  return speechVoices.find((voice) => voice.lang === language)
    || speechVoices.find((voice) => voice.lang.toLocaleLowerCase().startsWith(language.slice(0, 2).toLocaleLowerCase()))
    || null;
}

function speakText(text, options = {}) {
  if (!soundEnabled || !("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = activeLanguage;
  utterance.voice = voiceForLanguage(activeLanguage);
  utterance.rate = options.rate ?? smoothVoiceDefaults.wordRate;
  utterance.pitch = options.pitch ?? smoothVoiceDefaults.pitch;
  utterance.volume = 1;
  if (options.interrupt) {
    window.speechSynthesis.cancel();
  }
  window.speechSynthesis.speak(utterance);
}

function speakLetter(letter) {
  speakText(letter.toLocaleUpperCase(activeLanguage), {
    rate: smoothVoiceDefaults.letterRate,
    pitch: 1.08,
    interrupt: true,
  });
}

function speakWord(word) {
  speakText(word, {
    rate: smoothVoiceDefaults.wordRate,
    pitch: smoothVoiceDefaults.pitch,
    interrupt: true,
  });
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
  typedDisplay.dataset.placeholder = "";

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
  return typedLetters.map((item) => item.letter).join("").toLocaleLowerCase(activeLanguage);
}

function expectedWord() {
  return targetWord.toLocaleLowerCase(activeLanguage);
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
    setTimeout(() => speakWord(targetWord), 260);
    advanceToNextWord();
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

  const rawLetter = capsLockOn ? letter.toLocaleUpperCase(activeLanguage) : letter.toLocaleLowerCase(activeLanguage);
  typedLetters.push({
    letter: rawLetter.toLocaleLowerCase(activeLanguage),
    displayLetter: rawLetter,
    color: colorForLetter(typedLetters.length),
  });

  renderTypedLetters();
  pressVisual(rawLetter.toLocaleLowerCase(activeLanguage));
  playTone(expectedWord().includes(rawLetter.toLocaleLowerCase(activeLanguage)) ? 520 : 360);
  speakLetter(rawLetter);
  checkCompletion();
}

function setTargetWord(value, options = {}) {
  if (advanceTimer) {
    window.clearTimeout(advanceTimer);
    advanceTimer = null;
  }
  if (options.practiceMode) {
    practiceMode = options.practiceMode;
  }
  if (Number.isInteger(options.wordIndex)) {
    wordIndex = options.wordIndex;
  }
  targetWord = normalizeWord(value);
  targetWordDisplay.value = targetWord;
  targetWordDisplay.setAttribute("aria-label", `Target word ${targetWord}`);
  typedLetters = [];
  syncWordSize();
  renderTypedLetters();
  helperMessage.textContent = nextInstruction();
  setHelperMood("ready");
  updateNextKeyHighlight();
}

function setManualTargetWord(value) {
  setTargetWord(value, { practiceMode: "manual" });
}

function advanceToNextWord() {
  if (practiceMode !== "list") {
    return;
  }

  advanceTimer = window.setTimeout(() => {
    const words = wordListForLanguage(activeLanguage);
    wordIndex = (wordIndex + 1) % words.length;
    setTargetWord(listWordAt(wordIndex), { practiceMode: "list", wordIndex });
    speakWord(targetWord);
  }, 1500);
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
    speakText("Sound on", { interrupt: true });
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

function setLanguage(language) {
  activeLanguage = language;
  if (practiceMode === "list") {
    wordIndex = 0;
    setTargetWord(listWordAt(wordIndex), { practiceMode: "list", wordIndex });
  }
  speakWord(targetWord);
}

wordInput.addEventListener("input", () => {
  const cursorWord = normalizeWord(wordInput.value, "");
  if (cursorWord !== wordInput.value) {
    wordInput.value = cursorWord;
  }
  if (cursorWord) {
    setManualTargetWord(cursorWord);
  }
});

wordInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    setManualTargetWord(wordInput.value);
  }
});

languageSelect.addEventListener("change", () => setLanguage(languageSelect.value));

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
    handleLetter(event.key.toLocaleLowerCase(activeLanguage));
  }
});

loadSpeechVoices();
if ("speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = loadSpeechVoices;
}
setTargetWord(listWordAt(wordIndex), { practiceMode: "list", wordIndex });
updateKeyCase();
