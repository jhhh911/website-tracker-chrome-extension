import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const firebaseConfig = {
  databaseURL:
    "",
  // databaseURL: process.env.DATABASE_URL
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDB = ref(database, "leads");

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");

function render(arr) {
  let listItems = "";
  arr.forEach(lead => {
    listItems += `<li><a href="#" target="_blank">${lead}</a></li>`;
  });
  ulEl.innerHTML = listItems;
}

inputBtn.onclick = function () {
  push(referenceInDB, inputEl.value);
  inputEl.value = "";
};

deleteBtn.onclick = function () {};

onValue(referenceInDB, function (snapshot) {
 const snapshotValues =  snapshot.val()
 const leads = Object.values(snapshotValues)
 render(leads)
});
