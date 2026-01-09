import { stopwatch } from "./stopwatch.js";

stopwatch(
  60,
  "k",
  "l",
  "j",
  "audio/start.mp3",
  ".js-time",
  () => {
    console.log('works')
  }
);

let points = 0;

document.body.addEventListener('keydown', (event)=>{
  if(event.key === '*'){
    points += 5000;
    document.querySelector('.js-money').innerHTML = points;
  }else if(event.key === '/'){
    points -= 5000;
    document.querySelector('.js-money').innerHTML = points;
  }else if(event.key === '1'){
    window.location.href = './'
  }else if(event.key === '2'){
    window.location.href = './'
  }else if(event.key === '3'){
    window.location.href =  './stvanice'
  }
})
