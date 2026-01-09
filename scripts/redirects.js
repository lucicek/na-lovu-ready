window.AUDIO_BASE_PATH = window.AUDIO_BASE_PATH || '../';

function playAudio(name) {
  const audio = new Audio();
  audio.src = `${window.AUDIO_BASE_PATH}audio/${name}.mp3`;
  audio.play();
}

document.body.addEventListener('keydown', (event) => {
  // Pokud je fokus na inputu, nic neděj
  if(document.activeElement.tagName === 'INPUT') return;
  
  if (event.key === '1') {
    window.location.href = `${window.AUDIO_BASE_PATH}`;
  } else if (event.key === '2') {
    window.location.href = `${window.AUDIO_BASE_PATH}lov`;
  } else if (event.key === '3') {
    window.location.href = `${window.AUDIO_BASE_PATH}stvanice`;
  } else if (event.key === '+') {
    playAudio('lovec-prichazi');
  } else if (event.key === 'ě') {
    playAudio('lovec-start');
  } else if (event.key === 'š') {
    playAudio('zacatek');
  }
});
