const CATEGORY_DATA = {
  Brasil: [
    [
      "Cidades conectadas ampliam serviços digitais",
      "Tecnologia e atendimento público avançam em diferentes regiões.",
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1200&q=80",
    ],
    [
      "Infraestrutura urbana recebe novos investimentos",
      "Projetos priorizam mobilidade, segurança e qualidade de vida.",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
    ],
    [
      "Educação adota novas ferramentas digitais",
      "Recursos passam a complementar atividades em sala de aula.",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80",
    ],
  ],
  Mundo: [
    [
      "Países ampliam cooperação em tecnologia e ciência",
      "Encontros internacionais discutem inovação, economia e sustentabilidade.",
      "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1200&q=80",
    ],
    [
      "Projetos de energia limpa ganham escala",
      "Novos investimentos miram transição energética.",
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=80",
    ],
    [
      "Missões científicas avançam em novas pesquisas",
      "Equipes internacionais compartilham dados e tecnologia.",
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=900&q=80",
    ],
  ],
  Economia: [
    [
      "Empresas aceleram investimentos e acompanham o consumo",
      "Negócios ajustam estratégias diante de novos hábitos dos consumidores.",
      "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?auto=format&fit=crop&w=1200&q=80",
    ],
    [
      "Pequenos negócios apostam em produtividade",
      "Ferramentas digitais ajudam empresas a organizar operações.",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
    ],
    [
      "Comércio integra lojas físicas e internet",
      "Experiência de compra passa a combinar diferentes canais.",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80",
    ],
  ],
  Esportes: [
    [
      "Temporada esportiva movimenta equipes e torcedores",
      "Clubes intensificam preparação para os próximos desafios.",
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80",
    ],
    [
      "Atletas investem em tecnologia no treinamento",
      "Dados ajudam com desempenho e recuperação.",
      "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=900&q=80",
    ],
    [
      "Competições reúnem novos talentos",
      "Jovens atletas ganham espaço em torneios nacionais.",
      "https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=900&q=80",
    ],
  ],
  Entretenimento: [
    [
      "Cinema e streaming apresentam novas produções",
      "Calendário reúne estreias para diferentes públicos.",
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
    ],
    [
      "Música ganha novos formatos e experiências",
      "Artistas exploram lançamentos e apresentações digitais.",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80",
    ],
    [
      "Eventos culturais movimentam as cidades",
      "Programação inclui exposições, shows e festivais.",
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=900&q=80",
    ],
  ],
  Tecnologia: [
    [
      "Inteligência artificial ganha espaço no cotidiano",
      "Novas ferramentas digitais chegam ao trabalho, estudo e criatividade.",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    ],
    [
      "Dispositivos apostam em maior integração",
      "Novos produtos conectam serviços e recursos inteligentes.",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
    ],
    [
      "Ciência pesquisa materiais mais sustentáveis",
      "Laboratórios buscam soluções com menor impacto ambiental.",
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=900&q=80",
    ],
  ],
  Saúde: [
    [
      "Hábitos simples ajudam a construir uma rotina equilibrada",
      "Sono, alimentação e movimento fazem parte dos cuidados diários.",
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80",
    ],
    [
      "Alimentação variada é aliada do bem-estar",
      "Especialistas destacam equilíbrio e diversidade no prato.",
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=80",
    ],
    [
      "Atividade física entra na rotina de mais pessoas",
      "Movimento regular pode ajudar na disposição cotidiana.",
      "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=900&q=80",
    ],
  ],
  Norte: [
    [
      "Destaques da região Norte",
      "Acompanhe as principais notícias, serviços e acontecimentos da região Norte.",
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1200&q=80",
    ],
    [
      "Cidades da região têm novos projetos",
      "Infraestrutura, economia e serviços estão entre os destaques locais.",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
    ],
    [
      "Agenda regional reúne novidades",
      "Veja acontecimentos e informações de interesse da população.",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80",
    ],
  ],
  Nordeste: [
    [
      "Destaques da região Nordeste",
      "Acompanhe as principais notícias, serviços e acontecimentos da região Nordeste.",
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1200&q=80",
    ],
    [
      "Cidades da região têm novos projetos",
      "Infraestrutura, economia e serviços estão entre os destaques locais.",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
    ],
    [
      "Agenda regional reúne novidades",
      "Veja acontecimentos e informações de interesse da população.",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80",
    ],
  ],
  "Centro-Oeste": [
    [
      "Destaques da região Centro-Oeste",
      "Acompanhe as principais notícias, serviços e acontecimentos da região Centro-Oeste.",
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1200&q=80",
    ],
    [
      "Cidades da região têm novos projetos",
      "Infraestrutura, economia e serviços estão entre os destaques locais.",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
    ],
    [
      "Agenda regional reúne novidades",
      "Veja acontecimentos e informações de interesse da população.",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80",
    ],
  ],
  Sudeste: [
    [
      "Destaques da região Sudeste",
      "Acompanhe as principais notícias, serviços e acontecimentos da região Sudeste.",
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1200&q=80",
    ],
    [
      "Cidades da região têm novos projetos",
      "Infraestrutura, economia e serviços estão entre os destaques locais.",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
    ],
    [
      "Agenda regional reúne novidades",
      "Veja acontecimentos e informações de interesse da população.",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80",
    ],
  ],
  Sul: [
    [
      "Destaques da região Sul",
      "Acompanhe as principais notícias, serviços e acontecimentos da região Sul.",
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1200&q=80",
    ],
    [
      "Cidades da região têm novos projetos",
      "Infraestrutura, economia e serviços estão entre os destaques locais.",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
    ],
    [
      "Agenda regional reúne novidades",
      "Veja acontecimentos e informações de interesse da população.",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80",
    ],
  ],
};
const cat = document.body.dataset.category;
const cmsCat = cat === "Mundo" ? "Internacional" : cat;
let savedPosts = [];
try {
  const parsed = JSON.parse(localStorage.getItem("newsDemoPosts") || "[]");
  savedPosts = Array.isArray(parsed) ? parsed : [];
} catch (error) {
  console.warn("Notícias salvas inválidas; usando conteúdo padrão.", error);
}
const stored = savedPosts.filter(
  (p) => p && p.status === "published" && p.category === cmsCat,
);
const fallback = (CATEGORY_DATA[cat] || []).map((x, i) => ({
  id: "f" + i,
  title: x[0],
  excerpt: x[1],
  image: x[2],
  link: "#",
  category: cmsCat,
}));
const posts = stored.length ? stored : fallback;
const esc = (s) =>
  String(s || "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
function card(p, hero = false) {
  const href = p.link || "#";
  return `<article class="${hero ? "category-hero" : "news-card category-card"}"><a href="${esc(href)}" ${href !== "#" ? 'target="_blank" rel="noopener"' : ""}><img src="${esc(p.image || "https://placehold.co/900x520?text=Noticia")}" alt="${esc(p.title)}"><div class="${hero ? "category-hero-copy" : ""}"><span class="eyebrow">${esc(cat.toUpperCase())}</span><h${hero ? "1" : "3"}>${esc(p.title)}</h${hero ? "1" : "3"}><p>${esc(p.excerpt || "Confira os detalhes desta notícia.")}</p></div></a></article>`;
}
const heroEl = document.querySelector("#categoryHero");
const gridEl = document.querySelector("#categoryGrid");
const latestEl = document.querySelector("#categoryLatest");
if (heroEl && (posts[0] || fallback[0]))
  heroEl.innerHTML = card(posts[0] || fallback[0], true);
if (gridEl)
  gridEl.innerHTML = posts
    .slice(1)
    .concat(stored.length < 4 ? fallback.slice(Math.max(1, stored.length)) : [])
    .slice(0, 6)
    .map((p) => card(p))
    .join("");
if (latestEl)
  latestEl.innerHTML = posts
    .concat(fallback)
    .slice(0, 8)
    .map(
      (p, i) =>
        `<article class="latest-item"><img class="latest-real-thumb" src="${esc(p.image)}" alt=""><div><time>Agora • ${esc(cat)}</time><h3><a href="${esc(p.link || "#")}">${esc(p.title)}</a></h3><p>${esc(p.excerpt || "")}</p></div></article>`,
    )
    .join("");
const menuBtn = document.querySelector("#menuBtn"),
  sideMenu = document.querySelector("#sideMenu"),
  overlay = document.querySelector("#overlay"),
  closeMenu = document.querySelector("#closeMenu");
function closeNav() {
  sideMenu?.classList.remove("open");
  overlay?.classList.remove("show");
  sideMenu?.setAttribute("aria-hidden", "true");
  menuBtn?.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}
menuBtn?.addEventListener("click", () => {
  sideMenu?.classList.add("open");
  overlay?.classList.add("show");
  sideMenu?.setAttribute("aria-hidden", "false");
  menuBtn.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
});
closeMenu?.addEventListener("click", closeNav);
overlay?.addEventListener("click", closeNav);
sideMenu
  ?.querySelectorAll("a")
  .forEach((a) => a.addEventListener("click", closeNav));
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

// Busca do cabeçalho: pesquisa o conteúdo visível da página.
(() => {
  const input = document.querySelector("#headerSearchInput");
  if (!input) return;

  const normalize = (value) =>
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

  const searchable = [
    ...document.querySelectorAll(
      "main article, main .card-destaque, main .news-card, main .category-card",
    ),
  ];

  const runSearch = () => {
    const query = normalize(input.value);
    let matches = 0;

    searchable.forEach((item) => {
      const found = !query || normalize(item.textContent).includes(query);
      item.style.display = found ? "" : "none";
      if (found && query) matches += 1;
    });

    if (!query) return;
    const first = searchable.find((item) => item.style.display !== "none");
    if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });

    const toast = document.querySelector("#toast");
    if (toast) {
      toast.textContent = matches
        ? `${matches} resultado${matches === 1 ? "" : "s"} encontrado${matches === 1 ? "" : "s"} para “${input.value.trim()}”`
        : `Nenhum resultado encontrado para “${input.value.trim()}”`;
      toast.classList.add("show");
      clearTimeout(runSearch.timer);
      runSearch.timer = setTimeout(() => toast.classList.remove("show"), 3200);
    }
  };

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      runSearch();
    }
    if (event.key === "Escape") {
      input.value = "";
      runSearch();
      input.blur();
    }
  });

  input.addEventListener("input", () => {
    if (!input.value.trim()) runSearch();
  });
})();

// Painel de busca e acessibilidade do menu nas páginas de categoria.
(() => {
  const panel = document.querySelector("#searchPanel");
  const form = document.querySelector("#searchForm");
  const modalInput = document.querySelector("#searchInput");
  const close = document.querySelector("#searchClose");
  const header = document.querySelector("#headerSearchInput");
  if (form && modalInput && header) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      header.value = modalInput.value;
      header.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Enter", bubbles: true }),
      );
      panel?.classList.remove("show");
    });
  }
  close?.addEventListener("click", () => panel?.classList.remove("show"));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeNav();
      panel?.classList.remove("show");
    }
  });
})();
