  import { questions } from "./questions.js";
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
  import { getDatabase, ref, set, onValue, get } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

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

    for(const key in q.answers){
      const [value, isCorrect] = q.answers[key];
      const btn = document.createElement("button");
      btn.textContent = `${key}) ${value}`;
      btn.dataset.option = key;
      btn.classList.add("option");

      btn.addEventListener("click", () => {
        set(ref(db, `sessions/${sessionId}/${currentDifficulty}/${index}`), { selectedOption: key });
        set(ref(db, `sessions/${sessionId}`), { selectedOption: key });
        set(ref(db, `sessions/234567`), { selectedOption: key });

        const allBtns = answersEl.querySelectorAll(".option");
        allBtns.forEach(b => { b.classList.remove('selected', 'selected-lovec', 'correct'); b.style.backgroundColor = ""; b.style.color = "black"; });
        btn.style.backgroundColor = "#ddd";
        currentSelection = key;
      });

      answersEl.appendChild(btn);
    }

    (function fetchCurrentSelection() {
      const index = indices[currentDifficulty];
      get(ref(db, `sessions/${sessionId}`)).then(snapshot => {
        const data = snapshot.val() || {};
        let sel = null;
        if(data[currentDifficulty] && data[currentDifficulty][index] && data[currentDifficulty][index].selectedOption){
          sel = data[currentDifficulty][index].selectedOption;
        } else if(data.selectedOption){
          sel = data.selectedOption;
        }
        currentSelection = sel;
      }).catch(()=>{currentSelection=null;});
    })();
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

    if(e.key.toLowerCase()==="y" && currentSelection){
      const allBtns = answersEl.querySelectorAll('.option');
      allBtns.forEach(b => { b.style.backgroundColor = ''; b.style.color = ''; });
      const btn = answersEl.querySelector(`button[data-option="${currentSelection}"]`);
      if(btn){ btn.classList.add('selected'); }
    }

    if(e.key.toLowerCase()==="x"){
      const allBtns = answersEl.querySelectorAll('.option');
      allBtns.forEach(b => { b.style.backgroundColor = ''; b.style.color = ''; });
      (async()=>{
        let sel=null;
        try{const snapshot=await get(ref(db, `sessions/234567`)); sel = snapshot.val()?.selectedOption || null;}
        catch(err){sel=null;}
        if(sel){
          const btn = answersEl.querySelector(`button[data-option="${sel}"]`);
          if(btn){ btn.classList.add('selected-lovec'); }
        }
      })();
    }

    if(e.key.toLowerCase()==="c"){
      const allBtns = answersEl.querySelectorAll('.option');
      allBtns.forEach(b => { b.style.backgroundColor = ''; b.style.color = ''; });
      const index = indices[currentDifficulty];
      const q = currentQuestions[index];
      if(q){
        let correctKey=null;
        for(const key in q.answers){ if(q.answers[key][1]) { correctKey = key; break; } }
        if(correctKey){
          const btn = answersEl.querySelector(`button[data-option="${correctKey}"]`);
          if(btn){ btn.classList.add('correct'); }
        }
      }
    }
  });

  // ------------------- INPUTS LOGIC -------------------
  const inputs = document.querySelectorAll('.container input');
  let activeIndex = -1;
  let ctrlIndex = -1;

  function updateBlueHighlight(){
    inputs.forEach((input,index)=>{
      if(input.classList.contains('ctrl-highlight')) return;
      if(activeIndex>=0 && index<=activeIndex) input.classList.add('active');
      else input.classList.remove('active');
    });
  }

  inputs.forEach((input,index)=>{
    input.addEventListener('keydown', e=>{
      if(e.key==='Enter' && input.value.trim()!==''){
        activeIndex=index;
        updateBlueHighlight();
      }
      if(e.key==='Control'){
        inputs.forEach(inp=>inp.classList.remove('ctrl-highlight'));
        ctrlIndex=index;
        for(let i=0;i<=index;i++) inputs[i].classList.add('ctrl-highlight');
        updateBlueHighlight();
      }
    });
  });

  document.addEventListener('keydown', e=>{
    // Light-blue move
    if(activeIndex>=0){
      if(e.key==='ArrowDown' && activeIndex<inputs.length-1){
        e.preventDefault();
        const current = inputs[activeIndex];
        const next = inputs[activeIndex+1];
        [current.value,next.value]=[next.value,current.value];
        activeIndex++;
        updateBlueHighlight();
        next.focus();
      }
      if(e.key==='ArrowUp' && activeIndex>0){
        e.preventDefault();
        const current = inputs[activeIndex];
        const prev = inputs[activeIndex-1];
        [current.value,prev.value]=[prev.value,current.value];
        activeIndex--;
        updateBlueHighlight();
        prev.focus();
      }
    }

    // Red Ctrl move
    if(ctrlIndex>=0){
      if(e.key.toLowerCase()==='w' && ctrlIndex>0){
        e.preventDefault();
        const current = inputs[ctrlIndex];
        const above = inputs[ctrlIndex-1];
        [current.value,above.value]=[above.value,current.value];
        ctrlIndex--;
        inputs.forEach(inp=>inp.classList.remove('ctrl-highlight'));
        for(let i=0;i<=ctrlIndex;i++) inputs[i].classList.add('ctrl-highlight');
        updateBlueHighlight();
      }
      if(e.key.toLowerCase()==='s' && ctrlIndex<inputs.length-1){
        e.preventDefault();
        const current = inputs[ctrlIndex];
        const below = inputs[ctrlIndex+1];
        [current.value,below.value]=[below.value,current.value];
        ctrlIndex++;
        inputs.forEach(inp=>inp.classList.remove('ctrl-highlight'));
        for(let i=0;i<=ctrlIndex;i++) inputs[i].classList.add('ctrl-highlight');
        updateBlueHighlight();
      }
    }
  });

  // ------------------- INIT -------------------
  setDifficulty("easy");