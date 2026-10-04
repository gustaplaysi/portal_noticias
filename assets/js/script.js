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
const loadMore = document.querySelector("#loadMore");
const headerSearchInput = document.querySelector("#headerSearchInput");
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
menuBtn?.addEventListener("click", openMenu);
closeMenu?.addEventListener("click", closeSideMenu);
overlay?.addEventListener("click", closeSideMenu);
sideMenu
  ?.querySelectorAll("a")
  .forEach((a) => a.addEventListener("click", closeSideMenu));
function toggleSearch(show = true) {
  if (!searchPanel) return;
  searchPanel.classList.toggle("show", show);
  if (show && searchInput) setTimeout(() => searchInput.focus(), 250);
}
searchBtn?.addEventListener("click", () => toggleSearch(true));
searchClose?.addEventListener("click", () => toggleSearch(false));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeSideMenu();
    toggleSearch(false);
  }
});
searchForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const q = searchInput.value.trim();
  if (!q) return;
  showToast(`Busca demonstrativa: “${q}”`);
  toggleSearch(false);
  searchForm.reset();
});
if (headerSearchInput) {
  const normalizeSearch = (value) =>
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

  const runHeaderSearch = () => {
    const q = headerSearchInput.value.trim();
    const query = normalizeSearch(q);
    const items = [
      ...document.querySelectorAll(
        "main article, main .card-destaque, main .news-card, main .category-card",
      ),
    ];
    let matches = 0;

    items.forEach((item) => {
      const found = !query || normalizeSearch(item.textContent).includes(query);
      item.style.display = found ? "" : "none";
      if (found && query) matches += 1;
    });

    if (!query) return;
    const first = items.find((item) => item.style.display !== "none");
    if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
    showToast(
      matches
        ? `${matches} resultado${matches === 1 ? "" : "s"} encontrado${matches === 1 ? "" : "s"} para “${q}”`
        : `Nenhum resultado encontrado para “${q}”`,
    );
  };

  headerSearchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      runHeaderSearch();
    } else if (e.key === "Escape") {
      headerSearchInput.value = "";
      runHeaderSearch();
      headerSearchInput.blur();
    }
  });

  headerSearchInput.addEventListener("input", () => {
    if (!headerSearchInput.value.trim()) runHeaderSearch();
  });
}

const defaultNews = [
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
function getLatestNews() {
  let cms = [];
  try {
    const parsed = JSON.parse(localStorage.getItem("newsDemoPosts") || "[]");
    if (Array.isArray(parsed))
      cms = parsed.filter((p) => p?.status === "published");
  } catch (error) {
    console.warn("Não foi possível carregar notícias do CMS.", error);
  }
  const cmsNews = cms.map((p) => [
    "Agora",
    p.category || "Notícias",
    p.title || "Sem título",
    p.image || "",
    p.link || "#",
  ]);
  return [...cmsNews, ...defaultNews.map((n) => [...n, "", "#"])];
}
let visible = 5;
const latestList = document.querySelector("#latestList");
function renderLatest() {
  if (!latestList) return;
  const news = getLatestNews();
  latestList.innerHTML = news
    .slice(0, visible)
    .map(
      ([time, cat, title, image, link], i) =>
        `<article class="card-destaque">
          <div class="card-img-wrapper">
            <img src="${image || `https://images.unsplash.com/photo-${1510000000000 + i * 10000}?auto=format&fit=crop&w=400&q=80`}" onerror="this.src='https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80'" alt="${cat}">
          </div>
          <div class="card-body">
            <span class="badge badge-cyan">${cat}</span>
            <h3>${link !== "#" ? `<a href="${link}" target="_blank" rel="noopener noreferrer">${title}</a>` : title}</h3>
            <p>Confira os principais detalhes e entenda o contexto desta notícia demonstrativa.</p>
            <div class="gray-meta">
              <span>🕒 ${time} &nbsp;•&nbsp; Hoje</span>
            </div>
          </div>
        </article>`,
    )
    .join("");
  if (loadMore && visible >= news.length) loadMore.style.display = "none";
}
if (loadMore) {
  loadMore.addEventListener("click", () => {
    visible += 3;
    renderLatest();
  });
}
renderLatest();
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 3200);
}
const newsletterForm = document.querySelector("#newsletterForm");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.querySelector("#emailInput")?.value;
    showToast(`Cadastro demonstrativo realizado para ${email}`);
    e.target.reset();
  });
}
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
