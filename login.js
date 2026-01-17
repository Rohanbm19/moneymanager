const loginForm = document.getElementById("loginForm");
const msg = document.getElementById("msg");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();

  if (!username) {
    msg.textContent = "Enter username";
    msg.style.color = "red";
    return;
  }

  // 🔐 session only
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("currentUser", username);

  msg.textContent = "Login successful";
  msg.style.color = "green";

  setTimeout(() => {
    window.location.href = "calculator.html";
  }, 500);
});
