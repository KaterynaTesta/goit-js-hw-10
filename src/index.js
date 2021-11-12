import './css/styles.css';
import { debounce } from 'lodash';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchCountries } from './partials/api';
import Notiflix from 'notiflix';

// console.log(searchBox);
const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');
const countriesList = document.querySelector('.country-list');

fetchCountries();
searchBox.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
function onInput() {
  const inputText = searchBox.value.trim();

  countriesList.innerHTML = '';
  countryInfo.innerHTML = '';

  if (!inputText) {
    return;
  }
  fetchCountries(inputText)
    .then(countries => {
      if (countries.status === 404) {
        Notiflix.Notify.failure('Oops, there is no country with that name 😕');
        return;
      }
      if (countries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name 🤔');
      }
      if (countries.length > 1) {
        Notify.success('Congrats, your search request is succesful 🥳 ');

        renderCountriesList(countries);
        return;
      }
      renderCountryInfo(countries);
    })
    .catch(error => console.log(error));
}
function renderCountriesList(countries) {
  countryInfo.innerHTML = '';
  const markup = countries
    .map(country => {
      return `<li class="country-list-item">
          <img src='${country.flag}' alt='${country.name} flag' width='40' />
          <p>${country.name}</p>
        </li>
        `;
    })
    .join('');
  countryInfo.innerHTML = markup;
}

function renderCountryInfo(country) {
  countriesList.innerHTML = '';
  const markup = country
    .map(country => {
      return `<div class="renderCountryInfo-firstString">
          <img src='${country.flag}' alt='${country.name} flag' width='70' />
          <h2>${country.name}</h2>
        </div>
        <p><b>Capital</b>: ${country.capital}</p>
        <p><b>Population</b>: ${country.population}</p>
        <p><b>Languages</b>: ${country.languages.map(item => ` ${item.name}`)}</p>`;
    })
    .join('');
  countryInfo.innerHTML = markup;
}
