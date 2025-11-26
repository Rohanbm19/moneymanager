// Global variables to store saved and recent calculations
let savedCalculations = []
let recentCalculations = []

// Load data from localStorage on page load
window.addEventListener("load", () => {
  loadSavedData()
  updateSidebar()
})

function calculate() {
  const income = Number.parseFloat(document.getElementById("income").value) || 0
  const rent = Number.parseFloat(document.getElementById("rent").value) || 0
  const food = Number.parseFloat(document.getElementById("food").value) || 0
  const transport = Number.parseFloat(document.getElementById("transport").value) || 0
  const utilities = Number.parseFloat(document.getElementById("utilities").value) || 0
  const entertainment = Number.parseFloat(document.getElementById("entertainment").value) || 0
  const other = Number.parseFloat(document.getElementById("other").value) || 0

  const totalExpenses = rent + food + transport + utilities + entertainment + other
  const savings = income - totalExpenses

  document.getElementById("total-income").textContent = `₹${income.toLocaleString()}`
  document.getElementById("total-expenses").textContent = `₹${totalExpenses.toLocaleString()}`
  document.getElementById("savings").textContent = `₹${savings.toLocaleString()}`

  const resultsDiv = document.getElementById("results")
  if (savings < 0) {
    resultsDiv.classList.add("negative")
  } else {
    resultsDiv.classList.remove("negative")
  }
}

function saveCalculation() {
  const saveName = document.getElementById("save-name").value.trim()

  if (!saveName) {
    alert("Please enter a name for this calculation")
    return
  }

  const income = Number.parseFloat(document.getElementById("income").value) || 0
  const expenses = {
    rent: Number.parseFloat(document.getElementById("rent").value) || 0,
    food: Number.parseFloat(document.getElementById("food").value) || 0,
    transport: Number.parseFloat(document.getElementById("transport").value) || 0,
    utilities: Number.parseFloat(document.getElementById("utilities").value) || 0,
    entertainment: Number.parseFloat(document.getElementById("entertainment").value) || 0,
    other: Number.parseFloat(document.getElementById("other").value) || 0,
  }

  const totalExpenses = Object.values(expenses).reduce((sum, expense) => sum + expense, 0)
  const savings = income - totalExpenses

  const calculationData = {
    id: Date.now().toString(),
    name: saveName,
    income: income,
    expenses: expenses,
    totalExpenses: totalExpenses,
    savings: savings,
    createdAt: new Date().toISOString(),
  }

  // Add to saved calculations
  savedCalculations.push(calculationData)

  // Add to recent calculations (keep only last 5)
  recentCalculations.unshift(calculationData)
  if (recentCalculations.length > 5) {
    recentCalculations = recentCalculations.slice(0, 5)
  }

  // Save to localStorage
  localStorage.setItem("savedCalculations", JSON.stringify(savedCalculations))
  localStorage.setItem("recentCalculations", JSON.stringify(recentCalculations))

  // Clear the save name input
  document.getElementById("save-name").value = ""

  // Update the sidebar
  updateSidebar()

  alert("Calculation saved successfully!")
}

function loadCalculation(calculationData) {
  document.getElementById("income").value = calculationData.income
  document.getElementById("rent").value = calculationData.expenses.rent
  document.getElementById("food").value = calculationData.expenses.food
  document.getElementById("transport").value = calculationData.expenses.transport
  document.getElementById("utilities").value = calculationData.expenses.utilities
  document.getElementById("entertainment").value = calculationData.expenses.entertainment
  document.getElementById("other").value = calculationData.expenses.other

  // Recalculate to update the results
  calculate()
}

function deleteCalculation(id) {
  if (confirm("Are you sure you want to delete this calculation?")) {
    savedCalculations = savedCalculations.filter((calc) => calc.id !== id)
    localStorage.setItem("savedCalculations", JSON.stringify(savedCalculations))
    updateSidebar()
  }
}

function loadSavedData() {
  const saved = localStorage.getItem("savedCalculations")
  const recent = localStorage.getItem("recentCalculations")

  if (saved) {
    savedCalculations = JSON.parse(saved)
  }
  if (recent) {
    recentCalculations = JSON.parse(recent)
  }
}

function updateSidebar() {
  updateRecentList()
  updateSavedList()
}

function updateRecentList() {
  const recentList = document.getElementById("recent-list")

  if (recentCalculations.length === 0) {
    recentList.innerHTML = '<p class="empty-message">No recent calculations</p>'
    return
  }

  recentList.innerHTML = recentCalculations
    .map(
      (calc) => `
        <div class="calculation-item" onclick="loadCalculation(${JSON.stringify(calc).replace(/"/g, "&quot;")})">
            <div class="calculation-name">${calc.name}</div>
            <div class="calculation-details">Income: ₹${calc.income.toLocaleString()}</div>
            <div class="calculation-details">
                Savings: <span class="${calc.savings < 0 ? "negative-savings" : "positive-savings"}">
                    ₹${calc.savings.toLocaleString()}
                </span>
            </div>
            <div class="calculation-date">${new Date(calc.createdAt).toLocaleDateString()}</div>
        </div>
    `,
    )
    .join("")
}

function updateSavedList() {
  const savedList = document.getElementById("saved-list")

  if (savedCalculations.length === 0) {
    savedList.innerHTML = '<p class="empty-message">No saved calculations</p>'
    return
  }

  savedList.innerHTML = savedCalculations
    .map(
      (calc) => `
        <div class="calculation-item" onclick="loadCalculation(${JSON.stringify(calc).replace(/"/g, "&quot;")})">
            <button class="delete-btn" onclick="event.stopPropagation(); deleteCalculation('${calc.id}')" title="Delete">×</button>
            <div class="calculation-name">${calc.name}</div>
            <div class="calculation-details">Income: ₹${calc.income.toLocaleString()}</div>
            <div class="calculation-details">
                Savings: <span class="${calc.savings < 0 ? "negative-savings" : "positive-savings"}">
                    ₹${calc.savings.toLocaleString()}
                </span>
            </div>
            <div class="calculation-date">${new Date(calc.createdAt).toLocaleDateString()}</div>
        </div>
    `,
    )
    .join("")
}
function showToast(message, color = "#4caf50") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.backgroundColor = color;
  toast.classList.add("show");
  
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000); // disappears after 3 seconds
}
if (localStorage.getItem("loggedIn") !== "true") {
  window.location.href = "login.html";
}
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}
if (localStorage.getItem("loggedIn") !== "true") {
  window.location.href = "login.html";
}
