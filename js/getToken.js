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

// Enviar solicitud POST para obtener el token
export function getToken(email, password) {
  fetch("https://desafio-backend-jnku.onrender.com/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.id);
        validateSession(); // Actualizar la sesión
        window.location.href = "/"; // Redirigir a la página principal
      } else {
        alert("Credenciales incorrectas.");
      }
    })
    .catch((error) => console.error("Error:", error));
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
