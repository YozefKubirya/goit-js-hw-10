import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const refs = {
   input: document.querySelector('#search-box'),
   countryList: document.querySelector('.country-list'),
   countryInfo: document.querySelector('.country-info')
   
};
const DEBOUNCE_DELAY = 300;
refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(evt) {
   let name = evt.target.value.trim();
   
    if (name) {
       fetchCountries(name).then(onCheckNumberOfCountries).catch(onError);  
    } else {
       refs.countryList.innerHTML = ' ';
       refs.countryInfo.innerHTML = ' ';
    };
   
};
function renderMarkup(country) {
   console.log(country);
   
   if (country.length >= 2 && country.length <= 10) {
      const markupList = country.map(({ flags, name }) =>
         `
        <li class = "country-list__item">
            <img class = "country-list__img" src = "${flags.svg}" width="50" >
            <p class = "country-list__article">${name}</p>
        </li>
        `
      ).join('');
      refs.countryInfo.innerHTML = ' ';
      refs.countryList.innerHTML = markupList;
   } else {
     
      const markupinfo = country.map(({ flags, name, capital, population, languages }) => `
        <li class = "country-list__item">
            <img class = "country-list__img" src = "${flags.svg}" width="50" >
            <p class = "country-list__article">${name}</p>
             <p><b>Capital</b>: ${capital}</p>
            <p><b>Population</b>: ${population}</p>
            <p><b>Languages</b>: ${languages}</p>
        </li>
        `).join('');
      refs.countryList.innerHTML = ' ';
       refs.countryInfo.innerHTML = markupinfo;
   }
};
function onError() {
   Notiflix.Notify.failure("Oops, there is no country with that name");
   refs.countryInfo.innerHTML = ' ';
   refs.countryList.innerHTML = ' ';
};
function onCheckNumberOfCountries(country) {
   if (country.length >= 10) {
      refs.countryList.innerHTML = ' ';
      Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
      }else {
    renderMarkup(country);
   }
};
