// Imports necesarios desde validateSession.js
import { validateSession } from "./validateSession.js";

// Función para manejar el envío del formulario
const handleLogin = async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const token = await login(email, password);
    localStorage.setItem("authToken", token);

    const userId = parseJwt(token).id;
    localStorage.setItem("userId", userId);

    const userProfile = await getUserProfile(token);
    console.log(userProfile);

    window.location.href = "../index.html";
  } catch (error) {
    console.error("There was a problem with the login operation:", error);

    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
  }
};

function validateSession() {
  let hasToken = localStorage.getItem("token");
  let createPostBtn = document.getElementById("createPostBtn");
  let notifications = document.getElementById("notifications");
  let avatar = document.getElementById("avatar");
  let createAccount = document.getElementById("createAccount");
  let logOutBtn = document.getElementById("logOutBtn");
  let cardlogin = document.getElementById("card-login");

  if (!hasToken) {
    if (createPostBtn) createPostBtn.classList.remove("d-md-block");
    if (avatar) avatar.classList.add("d-none");
    if (notifications) notifications.classList.add("d-none");
    if (createAccount) createAccount.classList.add("d-md-block");
    if (logOutBtn) logOutBtn.classList.add("d-none");
    if (cardlogin) cardlogin.classList.add("d-md-block");
  } else {
    if (createPostBtn) createPostBtn.classList.add("d-md-block");
    if (avatar) avatar.classList.remove("d-none");
    if (notifications) notifications.classList.remove("d-none");
    if (createAccount) createAccount.classList.remove("d-md-block");
    if (logOutBtn) logOutBtn.classList.remove("d-none");
    if (cardlogin) cardlogin.classList.add("d-none");
  }
}

function logIn() {
  localStorage.setItem("token", "exampleToken");
  validateSession();
}

function logOut() {
  localStorage.removeItem("token");
  validateSession();
}

document.addEventListener("DOMContentLoaded", function () {
  validateSession();

  let loginButton = document.getElementById("login-button");
  if (loginButton) {
    loginButton.addEventListener("click", function (event) {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      if (email && password) {
        logIn();
        window.location.href = "/";
      } else {
        alert("Por favor, completa todos los campos.");
      }
    });
  }

  let logOutBtn = document.getElementById("logOutBtn");
  if (logOutBtn) {
    logOutBtn.addEventListener("click", function (event) {
      event.preventDefault();
      logOut();
      window.location.href = "/";
    });
  }
});

// Exportaciones
export { validateSession, logIn, logOut };
