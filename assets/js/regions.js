const menuBtn = document.querySelector("#menuBtn"),
  sideMenu = document.querySelector("#sideMenu"),
  overlay = document.querySelector("#overlay"),
  closeMenu = document.querySelector("#closeMenu");
function closeNav() {
  sideMenu.classList.remove("open");
  overlay.classList.remove("show");
  document.body.style.overflow = "";
}
if (menuBtn)
  menuBtn.onclick = () => {
    sideMenu.classList.add("open");
    overlay.classList.add("show");
    document.body.style.overflow = "hidden";
  };
if (closeMenu) closeMenu.onclick = closeNav;
if (overlay) overlay.onclick = closeNav;
const loginLink = document.querySelector("#loginLink");
if (loginLink && typeof getSession === "function") {
  const s = getSession();
  if (s?.role === "user") {
    loginLink.textContent = s.name.split(" ")[0] + " • Sair";
    loginLink.href = "#";
    loginLink.onclick = (e) => {
      e.preventDefault();
      logout();
    };
  }
}

// Busca local e controles de acessibilidade.
(() => {
  const input = document.querySelector("#headerSearchInput");
  const toast = document.querySelector("#toast");
  if (!input) return;
  const normalize = (v) =>
    String(v || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  const items = [
    ...document.querySelectorAll(
      "main article, main a.region-card, main .region-card",
    ),
  ];
  const run = () => {
    const q = normalize(input.value);
    let matches = 0;
    items.forEach((item) => {
      const ok = !q || normalize(item.textContent).includes(q);
      item.style.display = ok ? "" : "none";
      if (ok && q) matches++;
    });
    if (q && toast) {
      toast.textContent = matches
        ? `${matches} resultado${matches === 1 ? "" : "s"} encontrado${matches === 1 ? "" : "s"}.`
        : "Nenhum resultado encontrado.";
      toast.classList.add("show");
      clearTimeout(run.timer);
      run.timer = setTimeout(() => toast.classList.remove("show"), 3000);
    }
  };
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      run();
    }
    if (e.key === "Escape") {
      input.value = "";
      run();
      input.blur();
      closeNav();
    }
  });
  input.addEventListener("input", () => {
    if (!input.value.trim()) run();
  });
  sideMenu
    ?.querySelectorAll("a")
    .forEach((a) => a.addEventListener("click", closeNav));
})();
