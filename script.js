/* ================= AUTH CHECK ================= */

const currentUser = localStorage.getItem("currentUser");

if (localStorage.getItem("isLoggedIn") !== "true" || !currentUser) {
  window.location.href = "index.html";
}

/* ================= USER-SPECIFIC STORAGE KEYS ================= */

const SAVED_KEY = `savedCalculations_${currentUser}`;
const RECENT_KEY = `recentCalculations_${currentUser}`;

/* ================= GLOBAL DATA ================= */

let savedCalculations = [];
let recentCalculations = [];

/* ================= DOM ELEMENTS ================= */

const incomeInput = document.getElementById("income");
const rentInput = document.getElementById("rent");
const foodInput = document.getElementById("food");
const transportInput = document.getElementById("transport");
const utilitiesInput = document.getElementById("utilities");
const entertainmentInput = document.getElementById("entertainment");
const otherInput = document.getElementById("other");

const totalIncome = document.getElementById("total-income");
const totalExpensesSpan = document.getElementById("total-expenses");
const savingsSpan = document.getElementById("savings");

const recentList = document.getElementById("recent-list");
const savedList = document.getElementById("saved-list");

/* ================= LOAD DATA ================= */

window.addEventListener("load", () => {
  loadSavedData();
  updateSidebar();
});

/* ================= CALCULATE ================= */

function calculate() {
  const income = Number(incomeInput.value) || 0;
  const rent = Number(rentInput.value) || 0;
  const food = Number(foodInput.value) || 0;
  const transport = Number(transportInput.value) || 0;
  const utilities = Number(utilitiesInput.value) || 0;
  const entertainment = Number(entertainmentInput.value) || 0;
  const other = Number(otherInput.value) || 0;

  const totalExpenses =
    rent + food + transport + utilities + entertainment + other;
  const savings = income - totalExpenses;

  totalIncome.textContent = `₹${income.toLocaleString()}`;
  totalExpensesSpan.textContent = `₹${totalExpenses.toLocaleString()}`;
  savingsSpan.textContent = `₹${savings.toLocaleString()}`;
}

/* ================= SAVE CALCULATION ================= */

function saveCalculation() {
  const calc = {
    id: Date.now(),
    income: Number(incomeInput.value) || 0,
    expenses: {
      rent: Number(rentInput.value) || 0,
      food: Number(foodInput.value) || 0,
      transport: Number(transportInput.value) || 0,
      utilities: Number(utilitiesInput.value) || 0,
      entertainment: Number(entertainmentInput.value) || 0,
      other: Number(otherInput.value) || 0,
    },
    time: new Date().toLocaleDateString(),
  };

  savedCalculations.push(calc);

  recentCalculations.unshift(calc);
  if (recentCalculations.length > 5) recentCalculations.pop();

  localStorage.setItem(SAVED_KEY, JSON.stringify(savedCalculations));
  localStorage.setItem(RECENT_KEY, JSON.stringify(recentCalculations));

  updateSidebar();
}

/* ================= LOAD CALCULATION ================= */

function loadCalculation(calc) {
  incomeInput.value = calc.income;
  rentInput.value = calc.expenses.rent;
  foodInput.value = calc.expenses.food;
  transportInput.value = calc.expenses.transport;
  utilitiesInput.value = calc.expenses.utilities;
  entertainmentInput.value = calc.expenses.entertainment;
  otherInput.value = calc.expenses.other;
  calculate();
}

/* ================= DELETE SAVED ================= */

function deleteCalculation(id) {
  savedCalculations = savedCalculations.filter((c) => c.id !== id);
  localStorage.setItem(SAVED_KEY, JSON.stringify(savedCalculations));
  updateSidebar();
}

/* ================= STORAGE ================= */

function loadSavedData() {
  savedCalculations =
    JSON.parse(localStorage.getItem(SAVED_KEY)) || [];
  recentCalculations =
    JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
}

/* ================= SIDEBAR UI ================= */

function updateSidebar() {
  updateRecent();
  updateSaved();
}

function updateRecent() {
  if (recentCalculations.length === 0) {
    recentList.innerHTML = "<p>No recent calculations</p>";
    return;
  }

  recentList.innerHTML = recentCalculations
    .map(
      (c) => `
      <div class="calculation-item" onclick='loadCalculation(${JSON.stringify(
        c
      )})'>
        <strong>Income:</strong> ₹${c.income.toLocaleString()}<br>
        <strong>Savings:</strong> ₹${(
          c.income -
          Object.values(c.expenses).reduce((a, b) => a + b, 0)
        ).toLocaleString()}<br>
        <small>${c.time}</small>
      </div>
    `
    )
    .join("");
}

function updateSaved() {
  if (savedCalculations.length === 0) {
    savedList.innerHTML = "<p>No saved calculations</p>";
    return;
  }

  savedList.innerHTML = savedCalculations
    .map(
      (c) => `
      <div class="calculation-item">
        <div onclick='loadCalculation(${JSON.stringify(c)})'>
          <strong>Income:</strong> ₹${c.income.toLocaleString()}
        </div>
        <button onclick="deleteCalculation(${c.id})">Delete</button>
      </div>
    `
    )
    .join("");
}

/* ================= LOGOUT ================= */

function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}
