const USERS_KEY = "newsDemoUsers";
const SESSION_KEY = "newsDemoSession";

function readJSON(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "null");
    return value ?? fallback;
  } catch (error) {
    console.warn(
      `Dados locais inválidos em ${key}; usando valor padrão.`,
      error,
    );
    return fallback;
  }
}
function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Não foi possível salvar ${key}.`, error);
    return false;
  }
}
function getUsers() {
  const saved = readJSON(USERS_KEY, []);
  const users = Array.isArray(saved) ? saved : [];
  if (!users.some((u) => u?.email === "usuario@demo.com")) {
    users.push({
      name: "Usuário Demo",
      email: "usuario@demo.com",
      password: "123456",
      role: "user",
    });
    writeJSON(USERS_KEY, users);
  }
  return users;
}
function saveUsers(users) {
  return writeJSON(USERS_KEY, users);
}
function setSession(user) {
  return writeJSON(SESSION_KEY, {
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: Date.now(),
  });
}
function getSession() {
  const session = readJSON(SESSION_KEY, null);
  return session && typeof session === "object" ? session : null;
}
function logout() {
  localStorage.removeItem(SESSION_KEY);
  const inPages = location.pathname.includes("/pages/");
  location.href = inPages ? "../../index.html" : "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const topDate = document.getElementById("topDate");
  if (topDate) {
    const formatted = new Intl.DateTimeFormat("pt-BR", {
      timeZone: "America/Fortaleza",
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date());
    topDate.textContent =
      formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }
});
