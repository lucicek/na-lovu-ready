import { questions } from "./questions.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getDatabase, ref, set, onValue, get } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";
import { stopwatch } from "./stopwatch.js";

stopwatch(
  120,
  "k",
  "l",
  "j",
  "../audio/stvanice.mp3",
  ".js-time",
  () => {
    console.log('works')
  }
);

let divisions = 1; // aktuální počet částí
let currentColorIndex = 0; // kolik částí je červených
const container = document.getElementById('container');

function drawDivision() {
  container.innerHTML = '';

  const step = 100 / divisions;

  // přidat čáry
  for (let i = 1; i < divisions; i++) {
    const line = document.createElement('div');
    line.className = 'split-line';
    line.style.left = (i / divisions * 100) + '%';
    container.appendChild(line);
  }

  // přidat červené bloky
  for (let i = 0; i < currentColorIndex; i++) {
    const block = document.createElement('div');
    block.className = 'color-block';
    block.style.left = (i / divisions * 100) + '%';
    block.style.width = step + '%';
    container.appendChild(block);
  }

  // číslo na poslední části
  const lastPart = document.createElement('div');
  lastPart.className = 'last-part';
  lastPart.style.width = step + '%';
  lastPart.style.left = ((divisions - 1) / divisions * 100) + '%';
  lastPart.textContent = divisions;
  container.appendChild(lastPart);
}

document.body.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    divisions++;
    currentColorIndex = 0; // reset červených bloků při novém dělení
    drawDivision();
  }

  if (e.code === 'Enter') {
    e.preventDefault();
    if (currentColorIndex < divisions) {
      currentColorIndex++;
      drawDivision();
    }
  }

  if (e.code === 'Backspace') { // undo
    e.preventDefault();

    // nejdřív zkontrolovat červené bloky
    if (currentColorIndex > 0) {
      currentColorIndex--;
    } else if (divisions > 1) {
      // pokud nejsou červené bloky, vrátit počet částí
      divisions--;
      currentColorIndex = 0; // reset červených bloků na novém dělení
    }
    drawDivision();
  }
});


// počáteční vykreslení
drawDivision();

// ------------------- QUIZ MODAL LOGIC -------------------
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const modalEl = document.getElementById("modal");

let isModalOpen = false;

function toggleModal() {
  isModalOpen = !isModalOpen;
  modalEl.style.display = isModalOpen ? 'flex' : 'none';
  if(!isModalOpen){
    const allBtns = answersEl.querySelectorAll('.option');
    allBtns.forEach(b => { 
      b.classList.remove('selected', 'selected-lovec', 'correct');
      b.style.backgroundColor = ''; 
      b.style.color = 'black'; 
      b.style.borderColor = '#333';
      b.style.borderWidth = '1px';
    });
  }
}

modalEl.addEventListener('click', e => {
  if(e.target === modalEl) toggleModal();
});

const firebaseConfig = {
  apiKey: "AIzaSyAXyiKfWIfG47YywYP-X-PQaz5eQIXN1uU",
  authDomain: "simple-database-9506d.firebaseapp.com",
  databaseURL: "https://simple-database-9506d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "simple-database-9506d",
  storageBucket: "simple-database-9506d.appspot.com",
  messagingSenderId: "963520384696",
  appId: "1:963520384696:web:6c7e03e402d32c82f3ae4d"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const sessionId = '12345';

function loadIndicesFromLocalStorage() {
  const saved = localStorage.getItem('quizIndices');
  if(saved) {
    return JSON.parse(saved);
  }
  return { easy: 0, medium: 0, hard: 0 };
}

function saveIndicesToLocalStorage() {
  localStorage.setItem('quizIndices', JSON.stringify(indices));
}

let indices = loadIndicesFromLocalStorage();
let currentDifficulty = "easy";
let currentQuestions = [];
let currentSelection = null;

function loadQuestion() {
  const index = indices[currentDifficulty];
  const q = currentQuestions[index];
  if(!q) return;

  questionEl.textContent = q.q;
  answersEl.innerHTML = "";
}

function setDifficulty(level){
  const data = questions.find(d => d.difficulty===level);
  if(!data) return;
  currentDifficulty = level;
  currentQuestions = data.questions;
  currentSelection = null;
  // Zajistit, aby index nebyl mimo hranice
  if(indices[level] >= currentQuestions.length) {
    indices[level] = 0;
    saveIndicesToLocalStorage();
  }
  const allBtns = answersEl.querySelectorAll('.option');
  allBtns.forEach(b => { b.classList.remove('selected', 'selected-lovec', 'correct'); });
  loadQuestion();
}

onValue(ref(db, `sessions/${sessionId}`), snapshot => {
  const data = snapshot.val();
  if(!data) return;
  const index = indices[currentDifficulty];
  if(data.selectedOption){
    currentSelection = data.selectedOption;
    loadQuestion();
    return;
  }
  if(data[currentDifficulty] && data[currentDifficulty][index]){
    currentSelection = data[currentDifficulty][index].selectedOption;
    loadQuestion();
  }
});

document.addEventListener("keydown", e => {
  // Pokud je fokus na inputu, nic neděj
  if(document.activeElement.tagName === 'INPUT') return;
  
  if(e.key.toLowerCase()==="v"){ toggleModal(); return; }
  if(!isModalOpen) return;

  if(e.key==="4") setDifficulty("easy");
  if(e.key==="5") setDifficulty("medium");
  if(e.key==="6") setDifficulty("hard");

  if(e.key==="7") { indices.easy = 0; saveIndicesToLocalStorage(); loadQuestion(); }
  if(e.key==="8") { indices.medium = 0; saveIndicesToLocalStorage(); loadQuestion(); }
  if(e.key==="9") { indices.hard = 0; saveIndicesToLocalStorage(); loadQuestion(); }

  if(!currentQuestions.length) return;

  if(e.key==="ArrowRight"){
    if(indices[currentDifficulty]<currentQuestions.length-1){
      indices[currentDifficulty]++;
      saveIndicesToLocalStorage();
      currentSelection = null;
      const allBtns = answersEl.querySelectorAll('.option');
      allBtns.forEach(b => { b.classList.remove('selected', 'selected-lovec', 'correct'); });
      loadQuestion();
    }
  }

  if(e.key==="ArrowLeft"){
    if(indices[currentDifficulty]>0){
      indices[currentDifficulty]--;
      saveIndicesToLocalStorage();
      currentSelection = null;
      const allBtns = answersEl.querySelectorAll('.option');
      allBtns.forEach(b => { b.classList.remove('selected', 'selected-lovec', 'correct'); });
      loadQuestion();
    }
  }
});

// ------------------- INIT -------------------
setDifficulty("easy");