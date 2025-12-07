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


