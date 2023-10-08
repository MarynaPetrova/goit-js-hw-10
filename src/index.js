import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

select.addEventListener('change', onSelect);
createList();

async function createList() {
  try {
    select.classList.add('is-hidden');
    error.classList.add('is-hidden');
    loader.classList.remove('is-hidden');

    const data = await fetchBreeds();
    const optionList = data.map(({ id, name }) => `<option value='${id}'>${name}</option>`).join('');
    select.innerHTML = optionList;

    new SlimSelect({ select: select });

    loader.classList.add('is-hidden');
    select.classList.remove('is-hidden');
  } catch (err) {
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
  }
}

async function onSelect(evt) {
  catInfo.classList.add('is-hidden');
  select.classList.add('is-hidden');

  const selectBreedId = evt.currentTarget.value;
  try {
    const data = await fetchCatByBreed(selectBreedId);
    creteMarkup(data);
    loader.classList.add('is-hidden');
    catInfo.classList.remove('is-hidden');
  } catch (err) {
    loader.classList.add('is-hidden');
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
  }
}

function creteMarkup(data) {
  const { breeds, url } = data[0];
  const { name, temperament, description } = breeds[0];
  const card = `
   <img src="${url}" alt="${name}" width=500>
    <div>
      <h2>${name}</h2>
      <p>${description}</p>
      <p><span>Temperament:</span>${temperament}</p>
    </div>`;
  catInfo.innerHTML = card;
}