const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-million');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  // store the response from the server in data
  const data = await res.json();

  // read and store the required data i.e. name and money property from the result array
  const user = data.results[0];


  // new object to save the records from the result
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)  // floor function to remove the decimal values
  };


  // finally call the function to add the data on the document
  addNewData(newUser);
}

// Double eveyones money
function doubleMoney() {

  // using the array map function to double the salary and return a new array and not to alter the original array
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });


  // update the document with new data
  updateDocument();
}

// Sort users by richest
function sortByRichest() {

  // sort the users acc. to their wealth
  data.sort((a, b) => b.money - a.money);

  updateDocument();
}

// Filter only millionaires
function showMillionaires() {
  // filter method return the millionaires using condition
  data = data.filter(user => user.money > 1000000);

  updateDocument();
}

// Calculate the total wealth
function calculateWealth() {
  const total = data.reduce((acc, user) => (acc += user.money), 0);

  // create a new div element to show the total wealth of the listed username
  const wealth = document.createElement('div');
  wealth.innerHTML = `<h3>Total Wealth : <strong>${formatMoney(
    total
  )}</strong></h3>`;

  // append the element to the parent element
  main.appendChild(wealth);
}

// Add new obj to data arr
function addNewData(obj) {

  // array push method to add the data to the array
  data.push(obj);

  updateDocument();
}

// Update DOM
function updateDocument(providedData = data) {
  // Clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach(item => {
    // create a new div 
    const element = document.createElement('div');
    // add the class name to newly created div
    element.classList.add('person');

    // finally add the data to show on the div
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;

    // append the newly created div to the parent element
    main.appendChild(element);
  });
}

function formatMoney(number) {
  return number.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}

// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);