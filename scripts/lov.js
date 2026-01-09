import { questions } from "./questions.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getDatabase, ref, set, onValue, get } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

// HTML elementy
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const modalEl = document.getElementById("modal");

// Stav modalu
let isModalOpen = false;

// Funkce pro otevření/zavření modalu
function toggleModal() {
  isModalOpen = !isModalOpen;
  modalEl.style.display = isModalOpen ? 'flex' : 'none';
  if (!isModalOpen) {
    // Při zavření vyčistit styly tlačítek
    const allBtns = answersEl.querySelectorAll('.option');
    allBtns.forEach(b => {
      b.style.backgroundColor = '';
      b.style.color = 'black';
      b.style.borderColor = '#333';
      b.style.borderWidth = '1px';
    });
  }
}

// Kliknutí mimo modal pro zavření
modalEl.addEventListener('click', (e) => {
  if (e.target === modalEl) {
    toggleModal();
  }
});

// 🔹 Firebase config – vlož své údaje
const firebaseConfig = {
  apiKey: "AIzaSyAXyiKfWIfG47YywYP-X-PQaz5eQIXN1uU",
  authDomain: "simple-database-9506d.firebaseapp.com",
  databaseURL: "https://simple-database-9506d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "simple-database-9506d",
  storageBucket: "simple-database-9506d.appspot.com",
  messagingSenderId: "963520384696",
  appId: "1:963520384696:web:6c7e03e402d32c82f3ae4d"
};

// Inicializace Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Unikátní session ID pro cross-device
const sessionId = '12345';

// indexy pro každou obtížnost
const indices = { easy: 0, medium: 0, hard: 0 };

let currentDifficulty = "easy";
let currentQuestions = [];
let currentSelection = null;

// Funkce načte otázku podle obtížnosti a indexu
function loadQuestion() {
  const index = indices[currentDifficulty];
  const q = currentQuestions[index];
  if (!q) return;

  questionEl.textContent = q.q;
  answersEl.innerHTML = "";

  for (const key in q.answers) {
    const [value, isCorrect] = q.answers[key];

    const btn = document.createElement("button");
    btn.textContent = `${key}) ${value}`;
    btn.dataset.option = key;
    btn.classList.add("option");

    // Klik na mobilu → uloží do Firebase
    btn.addEventListener("click", () => {
      // Uložíme výběr do specifického místa (per-difficulty) i do top-level
      set(ref(db, `sessions/${sessionId}/${currentDifficulty}/${index}`), { selectedOption: key });
      set(ref(db, `sessions/${sessionId}`), { selectedOption: key });
      // Také uložíme pro lovec (session 234567)
      set(ref(db, `sessions/234567`), { selectedOption: key });

      // Odznačí všechny tlačítka a označí tuto šedě
      const allBtns = answersEl.querySelectorAll(".option");
      allBtns.forEach(b => { b.style.backgroundColor = ""; b.style.color = "black"; });
      btn.style.backgroundColor = "#ddd";
      currentSelection = key;
    });

    answersEl.appendChild(btn);
  }

  // Pozn.: neoznačujeme automaticky modře při načtení z Firebase.
  // Modrá značka se aplikuje pouze při stisknutí klávesy 'y'.

  // Jednorázově načteme aktuální výběr pro tuto otázku z DB
  (function fetchCurrentSelection() {
    const index = indices[currentDifficulty];
    get(ref(db, `sessions/${sessionId}`)).then(snapshot => {
      const data = snapshot.val() || {};
      let sel = null;

      // preferovat per-difficulty per-index uloženou volbu
      if (data[currentDifficulty] && data[currentDifficulty][index] && data[currentDifficulty][index].selectedOption) {
        sel = data[currentDifficulty][index].selectedOption;
      } else if (data.selectedOption) {
        sel = data.selectedOption;
      }

      currentSelection = sel;
    }).catch(() => { currentSelection = null; });
  })();
}

// Změna obtížnosti
function setDifficulty(level) {
  const data = questions.find(d => d.difficulty === level);
  if (!data) return;

  currentDifficulty = level;
  currentQuestions = data.questions;
  currentSelection = null; // reset

  // Načteme otázku
  loadQuestion();
}

// Posloucháme Firebase pro cross-device
onValue(ref(db, `sessions/${sessionId}`), snapshot => {
  const data = snapshot.val();
  if (!data) return;

  const index = indices[currentDifficulty];

  // kompatibilita: mobil možná ukládá top-level { selectedOption }
  if (data.selectedOption) {
    currentSelection = data.selectedOption;
    loadQuestion();
    return;
  }

  if (data[currentDifficulty] && data[currentDifficulty][index]){
    currentSelection = data[currentDifficulty][index].selectedOption;
    loadQuestion();
  }
});

// Klávesy
document.addEventListener("keydown", e => {
  if(e.key.toLowerCase() === "v") {
    toggleModal();
    return;
  }

  if (!isModalOpen) return; // Klávesy pro otázky jen když je modal otevřený

  if(e.key === "1") setDifficulty("easy");
  if(e.key === "2") setDifficulty("medium");
  if(e.key === "3") setDifficulty("hard");

  if(!currentQuestions.length) return;

  if(e.key === "ArrowRight"){
    if(indices[currentDifficulty] < currentQuestions.length - 1){
      indices[currentDifficulty]++;
      currentSelection = null;
      loadQuestion();
    }
  }

  if(e.key === "ArrowLeft"){
    if(indices[currentDifficulty] > 0){
      indices[currentDifficulty]--;
      currentSelection = null;
      loadQuestion();
    }
  }

  // Y → modře označí volbu z Firebase (zachová červený rámeček)
  if(e.key.toLowerCase() === "y" && currentSelection){
    // vyčistit jen modré pozadí všude
    const allBtns = answersEl.querySelectorAll('.option');
    allBtns.forEach(b => { b.style.backgroundColor = ''; b.style.color = 'black'; });

    const btn = answersEl.querySelector(`button[data-option="${currentSelection}"]`);
    if(btn){
      btn.style.backgroundColor = "blue";
      btn.style.color = "white";
    }
  }

  // X → červeně označí rámeček volby z lovec (session 234567) (zachová modré pozadí)
  if(e.key.toLowerCase() === "x"){
    // vyčistit jen červený rámeček všude
    const allBtns = answersEl.querySelectorAll('.option');
    allBtns.forEach(b => { b.style.borderColor = '#333'; b.style.borderWidth = '1px'; });

    // jednorázově načteme z session 234567
    (async () => {
      let sel = null;
      try {
        const snapshot = await get(ref(db, `sessions/234567`));
        const data = snapshot.val();
        sel = data && data.selectedOption ? data.selectedOption : null;
      } catch (err) {
        sel = null;
      }

      if(sel){
        const btn = answersEl.querySelector(`button[data-option="${sel}"]`);
        if(btn){
          btn.style.borderColor = "red";
          btn.style.borderWidth = "3px";
        }
      }
    })();
  }

  // C → zeleně označí pozadí správné odpovědi (zachová ostatní styly)
  if(e.key.toLowerCase() === "c"){
    // vyčistit jen zelené pozadí všude
    const allBtns = answersEl.querySelectorAll('.option');
    allBtns.forEach(b => { b.style.backgroundColor = b.style.backgroundColor === 'green' ? '' : b.style.backgroundColor; b.style.color = b.style.backgroundColor === 'green' ? 'black' : b.style.color; });

    // najít správnou odpověď pro aktuální otázku
    const index = indices[currentDifficulty];
    const q = currentQuestions[index];
    if (q) {
      let correctKey = null;
      for (const key in q.answers) {
        if (q.answers[key][1]) { // isCorrect
          correctKey = key;
          break;
        }
      }
      if (correctKey) {
        const btn = answersEl.querySelector(`button[data-option="${correctKey}"]`);
        if (btn) {
          btn.style.backgroundColor = "green";
          btn.style.color = "white";
        }
      }
    }
  }
});

// Start na easy
setDifficulty("easy");
