const loginForm = document.getElementById("loginForm");
const msg = document.getElementById("msg");

loginForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  // Get stored account
  const savedUser = localStorage.getItem("savedUsername");
  const savedPass = localStorage.getItem("savedPassword");

  if (user === savedUser && pass === savedPass) {
    msg.style.color = "green";
    msg.textContent = "Login successful!";

    localStorage.setItem("loggedIn", "true");

    setTimeout(() => {
      window.location.href = "calculator.html";
    }, 800);

  } else {
    msg.style.color = "red";
    msg.textContent = "Invalid username or password!";
  }
});
