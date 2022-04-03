'use strict';

let random = Math.trunc(Math.random() * (0, 250));
let set = new Set([]);
let arr;
let country;
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const input = document.querySelector('.input');
const btnSearch = document.querySelector('.btn');
const form = document.querySelector('.form');
let close;
input.focus();

let getCountry = function (country) {
  const request1 = new XMLHttpRequest();

  request1.open('GET', `https://restcountries.com/v2/name/${country}`);

  request1.send();

  request1.addEventListener('load', function () {
    console.log(request1.responseText);
    let [data] = JSON.parse(request1.responseText);
    let html = `      <article class="country" id="${country}" >
  
    <button class="close">x</button>
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      data.population / 1000000
    ).toFixed(1)}</p>
    <p class="country__row"><span>🗣️</span>${
      data.languages ? data.languages[0].name : data.language
    }</p>
    <p class="country__row"><span>💰</span>${
      data.currencies ? data.currencies[0].name : data.currencie
    }</p>
  </div>
</article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};
getLocal();

btnSearch.addEventListener('click', function (e) {
  country = input.value;
  e.preventDefault();
  if (!arr.includes(country)) {
    set.add(country);
    getCountry(country);
    arr.push(country);
    console.log(arr);
  } else {
    alert('Bor');
  }
  saveLocal();
});

countriesContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('close')) {
    e.target.closest('.country').remove();
    set.delete(e.target.closest('.country').id);
    [...arr] = set;
    console.log(arr);
    saveLocal();
    console.log(1);
  }
});

let saveLocal = () => {
  localStorage.setItem('name', JSON.stringify(arr));
};

function getLocal() {
  let data = JSON.parse(localStorage.getItem('name'));
  arr = data;
  arr.forEach(element => {
    getCountry(element);
  });
}
