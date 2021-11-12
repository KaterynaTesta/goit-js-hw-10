// export function fetchCountry(name) {
//   return fetch(`https://restcountries.com/v3.1/name/${name}`).then(response => {
//     if (!response.ok) {
//       throw Error(response.statusText);
//     }
//     return response.json();
//   });
// }

export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flag,languages`,
  ).then(response => {
    if (!response.ok) {
      console.log(response);
      throw new Error(response.status);
    }
    return response.json();
  });
}
