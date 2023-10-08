// ===== inport
import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_nbkb2pVVlvKW97BEJGBft4fISbnXLfjgcP5WDkUXtiM7A1gIiCcNF3upA5mJQY2G';

// ===== змінні
const BASE_URL = 'https://api.thecatapi.com/v1';
const BASE_ENDPOINT = '/images/search';

//===== fetchBreeds
export function fetchBreeds() {
  return axios
    .get(`${BASE_URL}/breeds`)
    .then(resp => {
      return resp.data;
    })
    .catch(error => {
      throw new Error(error.status);
    });
}

//===== fetchCatByBreed
export function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}${BASE_ENDPOINT}?breed_ids=${breedId}`)
    .then(resp => {
      return resp.data;
    })
    .catch(error => {
      throw new Error(error.status);
    });
}
