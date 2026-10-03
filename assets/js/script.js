const menuBtn = document.querySelector("#menuBtn");
const sideMenu = document.querySelector("#sideMenu");
const closeMenu = document.querySelector("#closeMenu");
const overlay = document.querySelector("#overlay");
const searchBtn = document.querySelector("#searchBtn");
const searchPanel = document.querySelector("#searchPanel");
const searchClose = document.querySelector("#searchClose");
const searchInput = document.querySelector("#searchInput");
const searchForm = document.querySelector("#searchForm");
const toast = document.querySelector("#toast");
function openMenu() {
  sideMenu.classList.add("open");
  overlay.classList.add("show");
  sideMenu.setAttribute("aria-hidden", "false");
  menuBtn.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}
function closeSideMenu() {
  sideMenu.classList.remove("open");
  overlay.classList.remove("show");
  sideMenu.setAttribute("aria-hidden", "true");
  menuBtn.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}
menuBtn.addEventListener("click", openMenu);
closeMenu.addEventListener("click", closeSideMenu);
overlay.addEventListener("click", closeSideMenu);
sideMenu
  .querySelectorAll("a")
  .forEach((a) => a.addEventListener("click", closeSideMenu));
function toggleSearch(show = true) {
  searchPanel.classList.toggle("show", show);
  if (show) setTimeout(() => searchInput.focus(), 250);
}
searchBtn.addEventListener("click", () => toggleSearch(true));
searchClose.addEventListener("click", () => toggleSearch(false));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeSideMenu();
    toggleSearch(false);
  }
});
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const q = searchInput.value.trim();
  if (!q) return;
  showToast(`Busca demonstrativa: “${q}”`);
  toggleSearch(false);
  searchForm.reset();
});
const news = [
  [
    "23:42",
    "Brasil",
    "Cidades ampliam serviços digitais para facilitar atendimento ao cidadão",
  ],
  [
    "23:18",
    "Economia",
    "Pequenos negócios investem em tecnologia para ganhar produtividade",
  ],
  [
    "22:55",
    "Tecnologia",
    "Novos recursos digitais ajudam a organizar tarefas do cotidiano",
  ],
  [
    "22:31",
    "Saúde",
    "Especialistas reforçam importância de hábitos consistentes para o bem-estar",
  ],
  [
    "22:08",
    "Mundo",
    "Centros de pesquisa anunciam cooperação em projetos científicos",
  ],
  [
    "21:46",
    "Educação",
    "Instituições ampliam acesso a cursos de capacitação profissional",
  ],
  [
    "21:20",
    "Cidades",
    "Transporte público recebe novas soluções de informação em tempo real",
  ],
  [
    "20:57",
    "Ciência",
    "Pesquisadores estudam materiais com menor impacto ambiental",
  ],
  [
    "20:32",
    "Economia",
    "Consumidores comparam mais preços antes de finalizar compras online",
  ],
];
let visible = 5;
const latestList = document.querySelector("#latestList");
const loadMore = document.querySelector("#loadMore");
function renderLatest() {
  latestList.innerHTML = news
    .slice(0, visible)
    .map(
      ([time, cat, title], i) =>
        `<article class="latest-item"><div class="latest-thumb" style="filter:hue-rotate(${i * 22}deg)"></div><div><time>${time} • ${cat}</time><h3>${title}</h3><p>Confira os principais detalhes e entenda o contexto desta notícia demonstrativa.</p></div></article>`,
    )
    .join("");
  if (visible >= news.length) loadMore.style.display = "none";
}
loadMore.addEventListener("click", () => {
  visible += 3;
  renderLatest();
});
renderLatest();
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 3200);
}
document.querySelector("#newsletterForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.querySelector("#emailInput").value;
  showToast(`Cadastro demonstrativo realizado para ${email}`);
  e.target.reset();
});
document
  .querySelectorAll(".play")
  .forEach((btn) =>
    btn.addEventListener("click", () =>
      showToast("Player demonstrativo: vídeo não incluído neste protótipo."),
    ),
  );
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-scroll a");
window.addEventListener(
  "scroll",
  () => {
    let current = "";
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 180) current = section.id;
    });
    navLinks.forEach((link) => {
      link.style.color =
        link.getAttribute("href") === `#${current}` ? "var(--acento)" : "";
    });
  },
  { passive: true },
);

const loginLink = document.querySelector("#loginLink");
if (loginLink) {
  const session = getSession();
  if (session?.role === "user") {
    loginLink.textContent = session.name.split(" ")[0] + " • Sair";
    loginLink.href = "#";
    loginLink.onclick = (e) => {
      e.preventDefault();
      logout();
    };
  }
}
