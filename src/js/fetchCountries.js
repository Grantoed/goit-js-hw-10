export default function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v3.1/';
  //   const searchParams = new URLSearchParams({
  //     fieds: ['name', 'population', 'flags', 'languages'],
  //   });
  return fetch(
    `${BASE_URL}name/${name}?fields=name,population,flags,languages`
  ).then(r => r.json());
}
