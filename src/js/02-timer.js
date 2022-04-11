import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const options = {
  altInput: true,
  altFormat: 'F j, Y',
  dateFormat: 'Y-m-d',
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose,
};
let intervalId;
let targetDate;
const btnRef = document.querySelector('button[data-start]');
btnRef.disabled = true;
flatpickr('#datetime-picker', options);

function onClose(selectedDates) {
  const currentTime = new Date();
  const rawSelectedDate = selectedDates[0];

  if (rawSelectedDate < currentTime) {
    return Notify.failure('Please choose a date in the future');
  } else {
    targetDate = rawSelectedDate;
  }
  btnRef.disabled = false;
  return Notify.success(`${selectedDates}[0]`);
}

btnRef.addEventListener('click', () => {
  if (intervalId) {
    clearInterval(intervalId);
  }

  intervalId = setInterval(() => {
    const currentTime = new Date();

    if (targetDate <= currentTime) {
      clearInterval(intervalId);
      return;
    }

    const timeToEnd = convertMs(targetDate - currentTime);
    const timeToEndToString = addLeadingZero(timeToEnd);
    renderTime(timeToEndToString);
  }, 1000);
});

function renderTime({ days, hours, minutes, seconds }) {
  const dateDays = document.querySelector('.value[data-days]');
  const dateHours = document.querySelector('.value[data-hours]');
  const dateMinutes = document.querySelector('.value[data-minutes]');
  const dateSeconds = document.querySelector('.value[data-seconds]');
  dateDays.textContent = days;
  dateHours.textContent = hours;
  dateMinutes.textContent = minutes;
  dateSeconds.textContent = seconds;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(time) {
  return {
    days: `${time.days}`.padStart(2, '0'),
    hours: `${time.hours}`.padStart(2, '0'),
    minutes: `${time.minutes}`.padStart(2, '0'),
    seconds: `${time.seconds}`.padStart(2, '0'),
  };
}
