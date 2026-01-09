import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getDatabase, ref, set, onValue, get } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

// 🔹 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAXyiKfWIfG47YywYP-X-PQaz5eQIXN1uU",
  authDomain: "simple-database-9506d.firebaseapp.com",
  databaseURL: "https://simple-database-9506d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "simple-database-9506d",
  storageBucket: "simple-database-9506d.appspot.com",
  messagingSenderId: "963520384696",
  appId: "1:963520384696:web:6c7e03e402d32c82f3ae4d"
};

// 🔹 Inicializace Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 🔹 Unikátní session ID pro každého uživatele
const sessionId = '12345';

let currentSelection = null;

// tlačítka
const optionButtons = document.querySelectorAll('.option');
optionButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const selectedOption = btn.dataset.option;

    // Uložení volby do Firebase (top-level)
    set(ref(db, `sessions/${sessionId}`), { selectedOption });

    // Aktualizujeme currentSelection
    currentSelection = selectedOption;
  });
});

// Posloucháme změny z Firebase (pro cross-device)
onValue(ref(db, `sessions/${sessionId}`), snapshot => {
  const data = snapshot.val();
  if(data && data.selectedOption){
    currentSelection = data.selectedOption;
  }
});

// Stisk Y na PC → modře označí volbu
document.addEventListener('keydown', e => {
  if(e.key.toLowerCase() === 'y'){
    // vyčistit značení všech tlačítek
    optionButtons.forEach(b => { b.style.backgroundColor = ''; b.style.color = ''; });

    // pokud už máme currentSelection, použijeme ho
    if(currentSelection){
      const btn = document.querySelector(`.option[data-option="${currentSelection}"]`);
      if(btn){ btn.style.backgroundColor = 'blue'; btn.style.color = 'white'; }
      return;
    }

    // jinak jednorázově načteme z Firebase a případně použijeme první tlačítko
    (async () => {
      let sel = null;
      try {
        const snapshot = await get(ref(db, `sessions/${sessionId}`));
        const data = snapshot.val();
        sel = data && data.selectedOption ? data.selectedOption : null;
      } catch (err) {
        sel = null;
      }

      if(!sel){
        sel = optionButtons[0] ? optionButtons[0].dataset.option : null;
      }

      if(sel){
        const btn = document.querySelector(`.option[data-option="${sel}"]`);
        if(btn){ btn.style.backgroundColor = 'blue'; btn.style.color = 'white'; currentSelection = sel; }
      }
    })();
  }
});
