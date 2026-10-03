const USERS_KEY = "newsDemoUsers";
const SESSION_KEY = "newsDemoSession";
function getUsers() {
  const saved = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  if (!saved.length) {
    saved.push({
      name: "Usuário Demo",
      email: "usuario@demo.com",
      password: "123456",
      role: "user",
    });
    localStorage.setItem(USERS_KEY, JSON.stringify(saved));
  }
  return saved;
}
function setSession(user) {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ name: user.name, email: user.email, role: user.role }),
  );
}
function getSession() {
  return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
}
function logout() {
  localStorage.removeItem(SESSION_KEY);
  const inPages = location.pathname.includes("/pages/");
  location.href = inPages ? "../../index.html" : "index.html";
}

// Mantém a data do topo atualizada em todas as páginas que possuem #topDate.
document.addEventListener("DOMContentLoaded", () => {
  const topDate = document.getElementById("topDate");
  if (!topDate) return;
  const now = new Date();
  const formatted = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Fortaleza",
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(now);
  topDate.textContent = formatted.charAt(0).toUpperCase() + formatted.slice(1);
});
