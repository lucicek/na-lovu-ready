// stopwatch.js
export function stopwatch(
  startTime,
  startKey,
  resetKey,
  pauseKey,
  audioPath,
  targetSelector,
  onEnd
) {
  let time = startTime;
  let interval = null;
  let paused = false;

  const timeEl = document.querySelector(targetSelector);
  if (!timeEl) {
    console.error("Stopwatch: target element not found:", targetSelector);
    return;
  }

  const audio = new Audio(audioPath);

  function render() {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    timeEl.textContent = `${minutes}:${seconds}`;
  }

  function stopInternal() {
    clearInterval(interval);
    interval = null;
  }

  function resetAudio() {
    audio.pause();
    audio.currentTime = 0;
  }

  function start() {
    if (interval) return;

    paused = false;
    audio.play();

    interval = setInterval(() => {
      time--;
      render();

      if (time <= 0) {
        stopInternal();
        paused = false;
        resetAudio();
        onEnd?.();
      }
    }, 1000);
  }

  function reset() {
    stopInternal();
    paused = false;
    resetAudio();
    time = startTime;
    render();
  }

  function togglePause() {
    if (!interval && !paused) return;

    if (paused) {
      paused = false;
      audio.play();
      start();
    } else {
      paused = true;
      stopInternal();
      audio.pause();
    }
  }

  function handleKey(e) {
    if (e.key === startKey) start();
    if (e.key === resetKey) reset();
    if (e.key === pauseKey) togglePause();
  }

  document.addEventListener("keydown", handleKey);

  render();

  return {
    destroy() {
      stopInternal();
      resetAudio();
      document.removeEventListener("keydown", handleKey);
    }
  };
}
