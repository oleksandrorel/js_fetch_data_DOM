'use strict';

const BASE_URL = `https://mate-academy.github.io/phone-catalogue-static/api`;
// const detailUrl = `https://mate-academy.github.io/phone-catalogue-static/api
// /phones/:phoneId.json`;

const request = (url) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => {
      if (!response.ok) {
        setTimeout(() => {
          Promise.reject(new Error(`
          ${response.status} - ${response.statusText}
          `));
        }, 5000);
      }

      return response.json();
    })
    .then(result => result);
};

function makeList(arr) {
  const list = document.createElement(`ul`);

  arr.forEach(el => {
    list.insertAdjacentHTML(`afterbegin`, `
    <li>${el.name}</li>
    `);
  });

  document.body.append(list);
}

const phonesWithDetails = () => {
  return getPhones()
    .then(result => Promise.all(
      result.map(phone => getDetailsOfPhone(phone.id)
      )
    ));
};

const getPhones = () => request(`/phones.json`);
const getDetailsOfPhone = (phoneId) => request(`/phones/${phoneId}.json`);

getPhones()
  .then(result => {
    console.log(`List of phones:`, result);
    makeList(result);
  })
  .catch(error => console.warn(`Error:`, error));

phonesWithDetails()
  .then(result => console.log(`Phones with details:`, result))
  .catch(error => console.log(`Error:`, error));
