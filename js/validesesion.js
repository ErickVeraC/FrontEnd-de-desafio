function logout() {
  localStorage.removeItem("token");
  validateSession();
}

export { logout };
