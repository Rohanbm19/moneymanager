const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let expenseData = []; // Temporary in-memory storage

// Save data (POST request)
app.post("/save-expenses", (req, res) => {
    const { income, expenses, savings } = req.body;
    expenseData.push({ income, expenses, savings, date: new Date() });
    res.json({ message: "Data saved successfully" });
});

// Fetch all saved data (GET request)
app.get("/get-expenses", (req, res) => {
    res.json(expenseData);
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
showToast("Calculation saved successfully!");
