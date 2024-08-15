export function validateSession() {
  const hasToken = localStorage.getItem("token");
  const createPostBtn = document.getElementById("createPostBtn");
  const notifications = document.getElementById("notifications");
  const avatar = document.getElementById("avatar");
  const createAccount = document.getElementById("createAccount");
  const logOutBtn = document.getElementById("logOutBtn");
  const cardlogin = document.getElementById("card-login");

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

export function logOut() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  validateSession();
}
