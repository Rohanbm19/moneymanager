const signupForm = document.getElementById("signupForm");
const msg = document.getElementById("msg");

signupForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const newUser = document.getElementById("newUsername").value.trim();
  const newPass = document.getElementById("newPassword").value.trim();

  if (newUser === "" || newPass === "") {
    msg.style.color = "red";
    msg.textContent = "All fields are required!";
    return;
  }

  // Store user in localStorage
  localStorage.setItem("savedUsername", newUser);
  localStorage.setItem("savedPassword", newPass);

  msg.style.color = "green";
  msg.textContent = "Account created! Redirecting to login...";

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1000);
});
