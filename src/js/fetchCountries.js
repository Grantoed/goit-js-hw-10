export default function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v3.1/';

  return fetch(
    `${BASE_URL}name/${name}?fields=name,population,flags,languages,capital`
  ).then(r => {
    if (!r.ok) {
      throw new Error(r.status);
    }
    return r.json();
  });
}
