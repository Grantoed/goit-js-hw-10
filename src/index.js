import './css/styles.css';

import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

// import populateOutput from './js/populateOutput';
// import fetchCountries from './js/fetchCountries';
// import clearOutput from './js/clearOutput';

const BASE_URL = 'https://restcountries.com/v3.1/';
const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  const countryName = refs.input.value.trim();

  clearOutput();

  if (!countryName) {
    clearOutput();
    return;
  }
  fetchCountries(countryName)
    .then(populateOutput)
    .catch(() => makeFailureAlert());
}

function fetchCountries(name) {
  return fetch(
    `${BASE_URL}name/${name}?fields=name,population,flags,languages,capital`
  ).then(r => r.json());
}

function populateOutput(countries) {
  const listMarkup = countries
    .map(
      country =>
        `<li class='country-item'>
      <img class='country-flag' src="${country.flags.png}" alt="Country flag"/>
        ${country.name.official}
      </li>`
    )
    .join('');

  const cardMarkup = countries.map(
    country =>
      `<div class='card-head'>
      <img class='card-flag' src="${country.flags.png}" alt="Country flag"/>
      <h1 class='card-title'>${country.name.official}</h1>
      </div>
      <ul class='char-list'>
      <li class='char-item'><span class='char-name'>Capital:</span> ${
        country.capital
      }</li>
      <li class='char-item'><span class='char-name'>Population:</span> ${
        country.population
      }</li>
      <li class='char-item'><span class='char-name'>Languages:</span> ${Object.values(
        country.languages
      ).join(', ')}</li>
      </ul>`
  );

  if (countries.length > 10) {
    makeInfoAlert();
    return;
  }

  if (countries.length > 2) {
    refs.list.innerHTML = listMarkup;
  } else {
    refs.info.innerHTML = cardMarkup;
  }
}

function makeInfoAlert() {
  Notify.info('Too many matches found. Please enter a more specific name.');
}

function makeFailureAlert() {
  Notify.failure('Oops, there is no country with that name');
}

function clearOutput() {
  refs.list.innerHTML = '';
  refs.info.innerHTML = '';
}
