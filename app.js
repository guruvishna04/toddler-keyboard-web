let targetWord = "dada";
const defaultColor = "#e53935";
const rainbowColors = ["#e53935", "#fb8c00", "#fdd835", "#43a047", "#1e88e5", "#8e24aa"];
const sessionStorageKey = "littleTypingColors.session.v1";
const smoothVoiceDefaults = {
  letterRate: 0.62,
  wordRate: 0.68,
  pitch: 1.02,
};
const soundClips = {
  letter: [
    { frequency: 520, endFrequency: 610, duration: 0.07, type: "sine", volume: 0.035 },
  ],
  color: [
    { frequency: 440, endFrequency: 560, duration: 0.08, type: "sine", volume: 0.035 },
  ],
  move: [
    { frequency: 360, endFrequency: 420, duration: 0.045, type: "sine", volume: 0.022 },
  ],
  clear: [
    { frequency: 330, endFrequency: 260, duration: 0.09, type: "triangle", volume: 0.03 },
  ],
  back: [
    { frequency: 300, endFrequency: 240, duration: 0.075, type: "triangle", volume: 0.026 },
  ],
  capsOn: [
    { frequency: 520, endFrequency: 700, duration: 0.1, type: "sine", volume: 0.04 },
  ],
  capsOff: [
    { frequency: 520, endFrequency: 330, duration: 0.1, type: "sine", volume: 0.034 },
  ],
  soundOn: [
    { frequency: 500, duration: 0.08, type: "sine", volume: 0.034 },
    { frequency: 650, duration: 0.1, delay: 80, type: "sine", volume: 0.04 },
  ],
  soundOff: [
    { frequency: 360, endFrequency: 280, duration: 0.12, type: "triangle", volume: 0.028 },
  ],
  success: [
    { frequency: 523, duration: 0.12, type: "sine", volume: 0.045 },
    { frequency: 659, duration: 0.14, delay: 95, type: "sine", volume: 0.05 },
    { frequency: 784, duration: 0.18, delay: 205, type: "sine", volume: 0.055 },
  ],
  retry: [
    { frequency: 392, endFrequency: 330, duration: 0.18, type: "triangle", volume: 0.035 },
  ],
};
const wordPictures = {
  dada: "👨",
  papa: "👨",
  mama: "👩",
  maman: "👩",
  baby: "👶",
  bebe: "👶",
  cat: "🐱",
  gato: "🐱",
  chat: "🐱",
  katze: "🐱",
  dog: "🐶",
  perro: "🐶",
  chien: "🐶",
  hund: "🐶",
  apple: "🍎",
  apfel: "🍎",
  pomme: "🍎",
  milk: "🥛",
  leche: "🥛",
  lait: "🥛",
  milch: "🥛",
  ball: "⚽",
  bola: "⚽",
  balle: "⚽",
  teddy: "🧸",
  car: "🚗",
  auto: "🚗",
  truck: "🚚",
  camion: "🚚",
  bus: "🚌",
  train: "🚂",
  tren: "🚂",
  boat: "⛵",
  barco: "⛵",
  bateau: "⛵",
  plane: "✈️",
  avion: "✈️",
  book: "📘",
  libro: "📘",
  livre: "📘",
  buch: "📘",
  star: "⭐",
  moon: "🌙",
  sun: "☀️",
  house: "🏠",
  home: "🏠",
  casa: "🏠",
  maison: "🏠",
  haus: "🏠",
  bed: "🛏️",
  bath: "🛁",
  cup: "🥤",
  spoon: "🥄",
  plate: "🍽️",
  shoe: "👟",
  sock: "🧦",
  hat: "🧢",
  hand: "✋",
  foot: "🦶",
  nose: "👃",
  eye: "👁️",
  ear: "👂",
  smile: "😊",
  laugh: "😄",
  flower: "🌼",
  cloud: "☁️",
  rain: "🌧️",
  snow: "❄️",
  leaf: "🍃",
  park: "🛝",
  slide: "🛝",
  swing: "🛝",
  banana: "🍌",
  orange: "🍊",
  grape: "🍇",
  melon: "🍈",
  berry: "🫐",
  carrot: "🥕",
  water: "💧",
  bread: "🍞",
  rice: "🍚",
  pasta: "🍝",
  cookie: "🍪",
  cake: "🍰",
  cheese: "🧀",
  yogurt: "🥣",
  drum: "🥁",
  bell: "🔔",
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
let soundClipsLoaded = false;

const targetWordDisplay = document.querySelector("#target-word");
const wordInput = targetWordDisplay;
const wordPicture = document.querySelector("#word-picture");
const typedDisplay = document.querySelector("#typed-display");
const helperComputer = document.querySelector("#helper-computer");
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
const remoteControlKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter", " "];

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

function saveSession() {
  try {
    localStorage.setItem(sessionStorageKey, JSON.stringify({
      activeLanguage,
      practiceMode,
      targetWord,
      wordIndex,
    }));
  } catch {
    // Storage can be unavailable in private or locked-down browser modes.
  }
}

function loadSavedSession() {
  try {
    const saved = JSON.parse(localStorage.getItem(sessionStorageKey) || "null");
    if (!saved || !wordBank[saved.activeLanguage] || !saved.targetWord) {
      return false;
    }

    activeLanguage = saved.activeLanguage;
    languageSelect.value = activeLanguage;
    wordIndex = Number.isInteger(saved.wordIndex) ? saved.wordIndex : 0;
    setTargetWord(saved.targetWord, {
      practiceMode: saved.practiceMode === "manual" ? "manual" : "list",
      wordIndex,
      skipSave: true,
    });
    saveSession();
    return true;
  } catch {
    return false;
  }
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

function formatVisibleWord(word) {
  return capsLockOn ? word.toLocaleUpperCase(activeLanguage) : word.toLocaleLowerCase(activeLanguage);
}

function pictureForWord(word) {
  return wordPictures[word.toLocaleLowerCase(activeLanguage)] || word[0]?.toLocaleUpperCase(activeLanguage) || "★";
}

function updateWordPicture() {
  const picture = pictureForWord(targetWord);
  wordPicture.textContent = picture;
  wordPicture.setAttribute("aria-label", `Picture for ${formatVisibleWord(targetWord)}`);
}

function updateTargetWordDisplay() {
  targetWordDisplay.value = formatVisibleWord(targetWord);
  targetWordDisplay.setAttribute("aria-label", `Target word ${formatVisibleWord(targetWord)}`);
  updateWordPicture();
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

function estimatedSpeechDuration(text) {
  return Math.min(2600, Math.max(900, text.length * 260 + 520));
}

function speakText(text, options = {}) {
  return new Promise((resolve) => {
    if (!soundEnabled || !("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
      window.setTimeout(resolve, options.fallbackDelay ?? estimatedSpeechDuration(text));
      return;
    }

    loadSpeechVoices();
    const utterance = new SpeechSynthesisUtterance(text);
    let finished = false;
    const fallbackTimer = window.setTimeout(finish, options.fallbackDelay ?? estimatedSpeechDuration(text));
    function finish() {
      if (finished) {
        return;
      }
      finished = true;
      window.clearTimeout(fallbackTimer);
      resolve();
    }

    utterance.lang = activeLanguage;
    utterance.voice = voiceForLanguage(activeLanguage);
    utterance.rate = options.rate ?? smoothVoiceDefaults.wordRate;
    utterance.pitch = options.pitch ?? smoothVoiceDefaults.pitch;
    utterance.volume = 1;
    utterance.onend = finish;
    utterance.onerror = finish;
    if (options.interrupt) {
      window.speechSynthesis.cancel();
    }
    window.speechSynthesis.speak(utterance);
  });
}

function speakLetter(letter) {
  speakText(letter.toLocaleLowerCase(activeLanguage), {
    rate: smoothVoiceDefaults.letterRate,
    pitch: smoothVoiceDefaults.pitch,
    interrupt: true,
  });
}

function speakTapPrompt(letter) {
  return speakText(`tap ${letter.toLocaleLowerCase(activeLanguage)}`, {
    rate: smoothVoiceDefaults.wordRate,
    pitch: smoothVoiceDefaults.pitch,
    interrupt: true,
  });
}

function speakWord(word) {
  return speakText(word.toLocaleLowerCase(activeLanguage), {
    rate: smoothVoiceDefaults.wordRate,
    pitch: smoothVoiceDefaults.pitch,
    interrupt: true,
  });
}

function waitForWordSpeech(word) {
  return speakWord(word).then(() => new Promise((resolve) => {
    window.setTimeout(resolve, 360);
  }));
}

function displayLetterForTarget(rawLetter, index) {
  return capsLockOn ? rawLetter.toLocaleUpperCase(activeLanguage) : rawLetter.toLocaleLowerCase(activeLanguage);
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

function unlockSound() {
  const context = getAudioContext();
  const markSoundReady = () => {
    document.documentElement.dataset.soundReady = context.state;
  };
  if (context && context.state === "suspended") {
    context.resume().then(markSoundReady).catch(markSoundReady);
  }
  if (context) {
    markSoundReady();
  }
  if ("speechSynthesis" in window) {
    window.speechSynthesis.resume();
  }
  preloadSoundClips();
  loadSpeechVoices();
}

function playTone(frequency, duration = 0.11, options = {}) {
  if (!soundEnabled) {
    return;
  }

  unlockSound();
  const context = getAudioContext();
  if (!context) {
    return;
  }

  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = options.type || "triangle";
  oscillator.frequency.value = frequency;
  if (options.endFrequency) {
    oscillator.frequency.exponentialRampToValueAtTime(options.endFrequency, context.currentTime + duration);
  }
  gain.gain.setValueAtTime(0.0001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(options.volume || 0.055, context.currentTime + 0.025);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + duration + 0.02);
}

function playChime(notes) {
  notes.forEach((note, index) => {
    window.setTimeout(() => {
      playTone(note.frequency, note.duration || 0.12, {
        endFrequency: note.endFrequency,
        type: note.type || "sine",
        volume: note.volume || 0.05,
      });
    }, note.delay ?? index * 90);
  });
}

function preloadSoundClips() {
  soundClipsLoaded = true;
  document.documentElement.dataset.soundClips = "loaded";
  return soundClips;
}

function playSoundClip(name) {
  const clip = soundClips[name] || soundClips.letter;
  playChime(clip);
}

function playSuccessSound() {
  playSoundClip("success");
}

function playRetrySound() {
  playSoundClip("retry");
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
  updateTargetWordDisplay();
  renderTypedLetters();
}

function setHelperMood(kind = "ready") {
  helperComputer.classList.remove("ready", "good", "try", "helping", "celebrating");
  helperComputer.classList.add(kind);

  if (kind === "celebrating") {
    helperMessageBubble.textContent = "You did it!";
    return;
  }
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

function expectedNextLetter() {
  return expectedWord()[typedLetters.length] || "";
}

function rejectIncorrectLetter(expectedLetter) {
  helperMessage.textContent = `Tap ${expectedLetter.toLocaleUpperCase(activeLanguage)}`;
  setHelperMood("try");
  helperMessageBubble.textContent = `Tap ${expectedLetter.toLocaleUpperCase(activeLanguage)}`;
  pressVisual(expectedLetter);
  playRetrySound();
  speakTapPrompt(expectedLetter);
  updateNextKeyHighlight();
  return false;
}

function checkCompletion() {
  const current = typedWord();
  const expected = expectedWord();

  updateNextKeyHighlight();

  if (current === expected) {
    helperMessage.textContent = `You typed ${formatVisibleWord(targetWord)}!`;
    setHelperMood("celebrating");
    celebrate();
    playSuccessSound();
    waitForWordSpeech(targetWord).then(advanceToNextWord);
    return;
  }

  if (expected.startsWith(current)) {
    helperMessage.textContent = nextInstruction();
    setHelperMood("good");
  } else {
    helperMessage.textContent = `Try ${formatVisibleWord(targetWord).split("").join(" ")}`;
    setHelperMood("try");
    playRetrySound();
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
  const normalizedLetter = rawLetter.toLocaleLowerCase(activeLanguage);
  const nextLetter = expectedNextLetter();
  if (nextLetter && normalizedLetter !== nextLetter) {
    rejectIncorrectLetter(nextLetter);
    return;
  }

  typedLetters.push({
    letter: normalizedLetter,
    displayLetter: rawLetter,
    color: colorForLetter(typedLetters.length),
  });

  renderTypedLetters();
  pressVisual(normalizedLetter);
  playSoundClip("letter");
  speakLetter(rawLetter.toLocaleLowerCase(activeLanguage));
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
  targetWord = normalizeWord(value).toLocaleLowerCase(activeLanguage);
  updateTargetWordDisplay();
  typedLetters = [];
  syncWordSize();
  renderTypedLetters();
  helperMessage.textContent = nextInstruction();
  setHelperMood("ready");
  updateNextKeyHighlight();
  if (!options.skipSave) {
    saveSession();
  }
}

function setManualTargetWord(value) {
  setTargetWord(value, { practiceMode: "manual" });
}

function scheduleListAdvance() {
  advanceTimer = window.setTimeout(() => {
    const words = wordListForLanguage(activeLanguage);
    wordIndex = (wordIndex + 1) % words.length;
    setTargetWord(listWordAt(wordIndex), { practiceMode: "list", wordIndex });
    speakWord(targetWord);
  }, 520);
}

function returnToListAfterManualWord() {
  practiceMode = "list";
  scheduleListAdvance();
}

function advanceToNextWord() {
  if (practiceMode === "manual") {
    returnToListAfterManualWord();
    return;
  }

  scheduleListAdvance();
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
  playSoundClip("color");
}

function clearTypedLetters() {
  typedLetters = [];
  renderTypedLetters();
  helperMessage.textContent = nextInstruction();
  setHelperMood("ready");
  updateNextKeyHighlight();
  playSoundClip("clear");
}

function removeLastLetter() {
  typedLetters.pop();
  renderTypedLetters();
  checkCompletion();
  playSoundClip("back");
}

function celebrate() {
  wordStage.classList.remove("complete");
  void wordStage.offsetWidth;
  wordStage.classList.add("complete");

  const colors = ["#e53935", "#fb8c00", "#1e88e5", "#43a047", "#fdd835", "#8e24aa"];
  const symbols = ["★", "●", "◆", "▲", "✦", "■", "⬟"];

  for (let index = 0; index < 64; index += 1) {
    const spark = document.createElement("span");
    spark.className = "spark";
    spark.textContent = symbols[index % symbols.length];
    spark.style.left = `${6 + Math.random() * 88}%`;
    spark.style.top = `${8 + Math.random() * 36}%`;
    spark.style.color = colors[index % colors.length];
    spark.style.animationDelay = `${Math.random() * 220}ms`;
    celebrationLayer.appendChild(spark);
    setTimeout(() => spark.remove(), 3200);
  }
}

function toggleSound() {
  unlockSound();
  if (soundEnabled) {
    playSoundClip("soundOff");
    soundEnabled = false;
  } else {
    soundEnabled = true;
    playSoundClip("soundOn");
  }
  soundToggle.textContent = soundEnabled ? "Sound On" : "Sound Off";
  soundToggle.setAttribute("aria-pressed", String(soundEnabled));
}

function toggleCapsLock() {
  capsLockOn = !capsLockOn;
  updateKeyCase();
  playSoundClip(capsLockOn ? "capsOn" : "capsOff");
}

function focusableControls() {
  return Array.from(document.querySelectorAll("button, select, input"))
    .filter((element) => !element.disabled && element.offsetParent !== null);
}

function elementCenter(element) {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}

function moveFocusByDirection(key) {
  const controls = focusableControls();
  if (!controls.length) {
    return;
  }

  const active = controls.includes(document.activeElement) ? document.activeElement : keyButtons.find((button) => button.classList.contains("next-key")) || controls[0];
  if (!controls.includes(document.activeElement)) {
    active.focus();
    return;
  }

  const current = elementCenter(active);
  const candidates = controls.filter((control) => control !== active).map((control) => {
    const center = elementCenter(control);
    const dx = center.x - current.x;
    const dy = center.y - current.y;
    return { control, dx, dy, distance: Math.hypot(dx, dy) };
  }).filter(({ dx, dy }) => {
    if (key === "ArrowRight") {
      return dx > 8 && Math.abs(dy) < 180;
    }
    if (key === "ArrowLeft") {
      return dx < -8 && Math.abs(dy) < 180;
    }
    if (key === "ArrowDown") {
      return dy > 8;
    }
    return dy < -8;
  });

  const next = candidates.sort((a, b) => {
    const primaryA = key === "ArrowLeft" || key === "ArrowRight" ? Math.abs(a.dx) : Math.abs(a.dy);
    const primaryB = key === "ArrowLeft" || key === "ArrowRight" ? Math.abs(b.dx) : Math.abs(b.dy);
    const crossA = key === "ArrowLeft" || key === "ArrowRight" ? Math.abs(a.dy) : Math.abs(a.dx);
    const crossB = key === "ArrowLeft" || key === "ArrowRight" ? Math.abs(b.dy) : Math.abs(b.dx);
    return crossA - crossB || primaryA - primaryB || a.distance - b.distance;
  })[0];

  if (next) {
    next.control.focus();
    playSoundClip("move");
  }
}

function activateFocusedControl() {
  const active = document.activeElement;
  if (active && active !== document.body && typeof active.click === "function" && active.tagName !== "INPUT" && active.tagName !== "SELECT") {
    active.click();
  }
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
    speakWord(targetWord);
  }
  playSoundClip("move");
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

["pointerdown", "click", "touchstart", "keydown"].forEach((eventName) => {
  document.addEventListener(eventName, unlockSound, { passive: true });
});

window.addEventListener("keydown", (event) => {
  unlockSound();

  if (remoteControlKeys.includes(event.key)) {
    event.preventDefault();
    if (event.key.startsWith("Arrow")) {
      moveFocusByDirection(event.key);
      return;
    }
    activateFocusedControl();
    return;
  }

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
preloadSoundClips();
if ("speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = loadSpeechVoices;
}
if (!loadSavedSession()) {
  setTargetWord(listWordAt(wordIndex), { practiceMode: "list", wordIndex });
}
updateKeyCase();
