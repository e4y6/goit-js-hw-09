import { Notify } from 'notiflix/build/notiflix-notify-aio';

const initialDelayRef = document.querySelector('input[name="delay"]');
const delayStepRef = document.querySelector('input[name="step"]');
const amountRef = document.querySelector('input[name="amount"]');
const formRef = document.querySelector('.form');

formRef.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  const position = Number(amountRef.value);
  const delayStep = Number(delayStepRef.value);
  let delay = Number(initialDelayRef.value);

  for (let i = 1; i <= position; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += delayStep;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
