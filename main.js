'use strict';

const BAR_MAX_HEIGHT = 10;
const bars = document.querySelectorAll('.c-chart__bar');

const getData = async function () {
  try {
    const res = await fetch('data.json');
    const data = await res.json();

    if (!res.ok) throw new Error('Failed on load data...');

    return data;
  } catch (err) {
    console.error(err);
  }
};

const maxAmount = function (data) {
  const max = data.reduce((cur, val) => (cur >= val.amount ? cur : val.amount), 0);
  return max;
};

const setCurrentDay = function (data) {
  const date = new Date();
  const day = date.toDateString().slice(0, 3).toLowerCase();

  bars.forEach((bar, i) => {
    if (data[i].day === day) bar.classList.add('c-chart__bar--current');
    else bar.classList.remove('c-chart__bar--current');
  });
};

const init = async function () {
  const data = await getData();
  const max = maxAmount(data);

  bars.forEach((bar, i) => (bar.style.height = `${(data[i].amount / max) * BAR_MAX_HEIGHT}rem`));

  setCurrentDay(data);
};

init();
