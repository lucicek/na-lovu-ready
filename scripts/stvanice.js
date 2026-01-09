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

document.body.addEventListener('keydown', (event)=>{
  if(event.key === '1'){
    window.location.href = '../'
  }else if(event.key === '2'){
    window.location.href = '../'
  }else if(event.key === '3'){
    window.location.href = '../stvanice'
  }
})


// počáteční vykreslení
drawDivision();