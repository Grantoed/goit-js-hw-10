export default function populateOutput(countries) {
  const listMarkup = countries.map(
    country =>
      `<li class='country-item'>
        <svg class='country-flag'>
          <use href='${country.flags.svg}'></use>
        </svg>
        ${country.name.official}
      </li>`
  );
  console.log(refs.list);
  if (countries.length > 2) {
    refs.list.innerHTML = listMarkup;
  }
}
