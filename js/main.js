import { getPosts } from "./printAllPosts.js";
import { getToken } from "./getToken.js";
import { logOut, validateSession } from "./validateSession.js";

document.addEventListener("DOMContentLoaded", () => {
  validateSession();

  const loginButton = document.getElementById("login-button");
  if (loginButton) {
    loginButton.addEventListener("click", (event) => {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      if (email && password) {
        getToken(email, password);
      } else {
        alert("Por favor, completa todos los campos.");
      }
    });
  }

  const logOutBtn = document.getElementById("logOutBtn");
  if (logOutBtn) {
    logOutBtn.addEventListener("click", (event) => {
      event.preventDefault();
      logOut();
      window.location.href = "/";
    });
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  getPosts();
});
