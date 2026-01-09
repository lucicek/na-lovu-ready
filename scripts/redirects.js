window.AUDIO_BASE_PATH = window.AUDIO_BASE_PATH || '../audio/';

function playAudio(name) {
  const audio = new Audio();
  audio.src = `${window.AUDIO_BASE_PATH}${name}.mp3`;
  audio.play();
}

document.body.addEventListener('keydown', (event) => {
  if (event.key === '1') {
    window.location.href = '../';
  } else if (event.key === '2') {
    window.location.href = '../lov';
  } else if (event.key === '3') {
    window.location.href = '../stvanice';
  } else if (event.key === '+') {
    playAudio('lovec-prichazi');
  } else if (event.key === 'ě') {
    playAudio('lovec-start');
  } else if (event.key === 'š') {
    playAudio('zacatek');
  }
});
