(() => {
  "use strict";

  const POSTS_KEY = "newsDemoPosts";
  const defaults = [
    {
      id: 1,
      title:
        "Novas iniciativas urbanas buscam melhorar mobilidade e qualidade de vida",
      category: "Brasil",
      excerpt:
        "Projetos unem tecnologia, transporte e planejamento em grandes cidades.",
      image:
        "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=900&q=80",
      link: "https://example.com/noticia/mobilidade",
      status: "published",
    },
    {
      id: 2,
      title: "Empresas aceleram investimentos e acompanham mudanças no consumo",
      category: "Economia",
      excerpt: "Empresas analisam novos hábitos e oportunidades.",
      image:
        "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?auto=format&fit=crop&w=900&q=80",
      link: "https://example.com/noticia/economia",
      status: "published",
    },
    {
      id: 3,
      title:
        "Ferramentas de inteligência artificial ganham espaço no cotidiano",
      category: "Tecnologia",
      excerpt: "Novas ferramentas digitais chegam a diferentes atividades.",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
      link: "https://example.com/noticia/tecnologia",
      status: "published",
    },
  ];

  const $ = (selector) => document.querySelector(selector);
  const els = {
    login: $("#adminLogin"),
    cms: $("#cms"),
    modal: $("#postModal"),
    loginForm: $("#adminLoginForm"),
    email: $("#adminEmail"),
    password: $("#adminPassword"),
    msg: $("#adminMsg"),
    list: $("#postList"),
    totalPosts: $("#totalPosts"),
    totalImages: $("#totalImages"),
    totalPublished: $("#totalPublished"),
    newPost: $("#newPostBtn"),
    navLogout: $("#navLogout"),
    search: $("#postSearch"),
    headerSearch: $("#headerAdminSearch"),
    closeModal: $("#closeModal"),
    cancelModal: $("#cancelModal"),
    form: $("#postForm"),
    id: $("#postId"),
    title: $("#postTitle"),
    category: $("#postCategory"),
    status: $("#postStatus"),
    excerpt: $("#postExcerpt"),
    image: $("#postImage"),
    link: $("#postLink"),
    modalTitle: $("#modalTitle"),
    preview: $("#imagePreview"),
  };

  function getPosts() {
    try {
      const parsed = JSON.parse(localStorage.getItem(POSTS_KEY) || "null");
      if (Array.isArray(parsed)) return parsed;
    } catch (error) {
      console.warn("Não foi possível ler as notícias salvas.", error);
    }
    const initial = defaults.map((post) => ({ ...post }));
    savePosts(initial);
    return initial;
  }

  function savePosts(posts) {
    try {
      localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
    } catch (error) {
      console.error("Não foi possível salvar as notícias.", error);
    }
  }

  function safeUrl(value, fallback = "#") {
    if (!value) return fallback;
    try {
      const url = new URL(value, location.href);
      return ["http:", "https:"].includes(url.protocol) ? url.href : fallback;
    } catch {
      return fallback;
    }
  }

  function createPostRow(post) {
    const article = document.createElement("article");
    article.className = "post-row";

    const imageLink = document.createElement("a");
    imageLink.className = "post-image";
    imageLink.href = safeUrl(post.link || post.image);
    imageLink.target = "_blank";
    imageLink.rel = "noopener noreferrer";
    imageLink.title = "Abrir link da notícia";
    const img = document.createElement("img");
    img.src = safeUrl(
      post.image,
      "https://placehold.co/240x140?text=Sem+imagem",
    );
    img.alt = post.title ? `Imagem: ${post.title}` : "Imagem da notícia";
    img.loading = "lazy";
    img.addEventListener(
      "error",
      () => {
        img.src = "https://placehold.co/240x140?text=Sem+imagem";
      },
      { once: true },
    );
    imageLink.appendChild(img);

    const info = document.createElement("div");
    info.className = "post-info";
    const category = document.createElement("span");
    category.textContent = post.category || "Sem categoria";
    const title = document.createElement("h3");
    title.textContent = post.title || "Sem título";
    const excerpt = document.createElement("p");
    excerpt.textContent = post.excerpt || "";
    const link = document.createElement("a");
    link.href = safeUrl(post.link);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Abrir link da notícia ↗";
    if (!post.link) link.classList.add("disabled-link");
    info.append(category, title, excerpt, link);

    const status = document.createElement("div");
    status.className = `post-status ${post.status === "draft" ? "draft" : "published"}`;
    status.textContent = post.status === "draft" ? "Rascunho" : "Publicada";

    const actions = document.createElement("div");
    actions.className = "post-actions";
    const edit = document.createElement("button");
    edit.type = "button";
    edit.textContent = "Editar";
    edit.addEventListener("click", () => openModal(post));
    const del = document.createElement("button");
    del.type = "button";
    del.className = "danger";
    del.textContent = "Excluir";
    del.addEventListener("click", () => deletePost(post.id));
    actions.append(edit, del);
    article.append(imageLink, info, status, actions);
    return article;
  }

  function render(filter = "") {
    const all = getPosts();
    const query = filter.trim().toLocaleLowerCase("pt-BR");
    const posts = all.filter((p) =>
      `${p.title || ""} ${p.category || ""} ${p.excerpt || ""}`
        .toLocaleLowerCase("pt-BR")
        .includes(query),
    );
    els.list.replaceChildren();
    if (!posts.length) {
      const empty = document.createElement("p");
      empty.className = "empty";
      empty.textContent = query
        ? "Nenhuma notícia encontrada para esta busca."
        : "Nenhuma notícia cadastrada.";
      els.list.appendChild(empty);
    } else posts.forEach((post) => els.list.appendChild(createPostRow(post)));
    els.totalPosts.textContent = all.length;
    els.totalImages.textContent = all.filter((p) => p.image).length;
    els.totalPublished.textContent = all.filter(
      (p) => p.status === "published",
    ).length;
  }

  function showCMS() {
    els.login.classList.add("hidden");
    els.cms.classList.remove("hidden");
    document.body.classList.add("cms-authenticated");
    render(els.search.value || "");
  }

  function openModal(post = {}) {
    els.form.reset();
    els.id.value = post.id || "";
    els.title.value = post.title || "";
    els.category.value = post.category || "Brasil";
    els.status.value = post.status || "published";
    els.excerpt.value = post.excerpt || "";
    els.image.value = post.image || "";
    els.link.value = post.link || "";
    els.modalTitle.textContent = post.id ? "Editar notícia" : "Nova notícia";
    updatePreview();
    els.modal.classList.remove("hidden");
    document.body.classList.add("modal-open");
    setTimeout(() => els.title.focus(), 0);
  }

  function closeModal() {
    els.modal.classList.add("hidden");
    document.body.classList.remove("modal-open");
  }

  function updatePreview() {
    els.preview.replaceChildren();
    const url = safeUrl(els.image.value, "");
    if (!url) {
      const span = document.createElement("span");
      span.textContent = els.image.value
        ? "Informe uma URL de imagem válida (http/https)."
        : "Prévia da imagem";
      els.preview.appendChild(span);
      return;
    }
    const img = document.createElement("img");
    img.src = url;
    img.alt = "Prévia";
    img.addEventListener(
      "error",
      () => {
        els.preview.replaceChildren();
        const span = document.createElement("span");
        span.textContent = "Não foi possível carregar esta imagem.";
        els.preview.appendChild(span);
      },
      { once: true },
    );
    els.preview.appendChild(img);
  }

  function deletePost(id) {
    if (!confirm("Excluir esta notícia? Esta ação não pode ser desfeita."))
      return;
    savePosts(getPosts().filter((p) => p.id !== id));
    render(els.search.value || "");
  }

  function logoutAdmin() {
    localStorage.removeItem(SESSION_KEY);
    location.reload();
  }

  els.loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    els.msg.textContent = "";
    if (
      els.email.value.trim().toLowerCase() === "admin@demo.com" &&
      els.password.value === "admin123"
    ) {
      setSession({
        name: "Administrador",
        email: els.email.value.trim(),
        role: "admin",
      });
      showCMS();
    } else {
      els.msg.textContent = "Credenciais de administrador inválidas.";
    }
  });

  els.newPost.addEventListener("click", () => openModal());
  els.navLogout.addEventListener("click", (e) => {
    e.preventDefault();
    if (getSession()?.role === "admin") logoutAdmin();
  });
  els.closeModal.addEventListener("click", closeModal);
  els.cancelModal.addEventListener("click", closeModal);
  els.modal.addEventListener("click", (e) => {
    if (e.target === els.modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !els.modal.classList.contains("hidden"))
      closeModal();
  });
  els.image.addEventListener("input", updatePreview);

  function syncSearch(value, source) {
    if (source !== els.search) els.search.value = value;
    if (source !== els.headerSearch) els.headerSearch.value = value;
    render(value);
  }
  els.search.addEventListener("input", (e) =>
    syncSearch(e.target.value, els.search),
  );
  els.headerSearch.addEventListener("input", (e) =>
    syncSearch(e.target.value, els.headerSearch),
  );

  els.form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = els.title.value.trim();
    if (!title) {
      els.title.focus();
      return;
    }
    if (els.image.value.trim() && !safeUrl(els.image.value.trim(), "")) {
      alert("Informe uma URL de imagem válida usando http:// ou https://.");
      els.image.focus();
      return;
    }
    if (els.link.value.trim() && !safeUrl(els.link.value.trim(), "")) {
      alert("Informe um link de notícia válido usando http:// ou https://.");
      els.link.focus();
      return;
    }
    const posts = getPosts();
    const data = {
      id: els.id.value ? Number(els.id.value) : Date.now(),
      title,
      category: els.category.value,
      status: els.status.value,
      excerpt: els.excerpt.value.trim(),
      image: els.image.value.trim(),
      link: els.link.value.trim(),
    };
    const index = posts.findIndex((p) => p.id === data.id);
    if (index >= 0) posts[index] = data;
    else posts.unshift(data);
    savePosts(posts);
    closeModal();
    render(els.search.value || "");
  });

  if (getSession()?.role === "admin") showCMS();
})();
