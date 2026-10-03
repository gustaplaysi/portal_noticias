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
