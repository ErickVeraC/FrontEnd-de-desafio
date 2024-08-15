const BASE_URL = "https://desafio-backend-jnku.onrender.com";

// Registrar un nuevo usuario
async function registerUser(name, email, password, profilePic) {
  const response = await fetch(`${BASE_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, profilePic }),
  });

  if (!response.ok) {
    throw new Error("Failed to register user");
  }

  return await response.json();
}

// Obtener la información de un usuario por ID
async function getUserById(userId) {
  const response = await fetch(`${BASE_URL}/user/${userId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return await response.json();
}

// Iniciar sesión y obtener un token JWT
async function loginUser(email, password) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Failed to log in");
  }

  const data = await response.json();
  return data.data.token;
}

export { registerUser, getUserById, loginUser };
