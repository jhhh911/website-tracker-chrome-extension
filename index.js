let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.getElementById("tab-btn");

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

tabBtn.onclick = function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
};

function render(arr) {
  let listItems = "";
  arr.forEach(lead => {
    listItems += `<li><a href="#" target="_blank">${lead}</a></li>`;
  });
  ulEl.innerHTML = listItems;
}

inputBtn.onclick = function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
};

deleteBtn.onclick = function () {
  localStorage.clear();
  myLeads = [];
  ulEl.innerHTML = "";
  render(myLeads);
};
