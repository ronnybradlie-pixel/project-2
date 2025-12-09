const loginForm = document.getElementById("loginForm");

if (!localStorage.getItem("user")) {
  window.location.href = "signin.html";
}

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (email === storedUser.email && password === storedUser.password) {
    alert("Login successful!");
    localStorage.setItem("loggedIn", "true");

    window.location.href = "index.html";
  } else {
    alert("Invalid email or password");
  }
});

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const validUser = users.find(
    user => user.email === email && user.password === password
  );

  if (validUser) {
    localStorage.setItem("loggedInUser", JSON.stringify(validUser));
    alert("Login Successful!");
    window.location.href = "index.html"; 
  } else {
    alert("Invalid login credentials!");
  }
});
