const startButtonRef = document.querySelector('button[data-start]');
const stopButtonRef = document.querySelector('button[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
stopButtonRef.disabled = true;
startButtonRef.addEventListener('click', onStart);
stopButtonRef.addEventListener('click', onStop);

function onStart() {
  startButtonRef.disabled = true;
  stopButtonRef.disabled = false;
  document.body.style.backgroundColor = getRandomHexColor();
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
function onStop() {
  stopButtonRef.disabled = true;
  startButtonRef.disabled = false;
  clearInterval(timerId);
}
