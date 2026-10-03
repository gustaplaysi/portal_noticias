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
    title: "Ferramentas de inteligência artificial ganham espaço no cotidiano",
    category: "Tecnologia",
    excerpt: "Novas ferramentas digitais chegam a diferentes atividades.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    link: "https://example.com/noticia/tecnologia",
    status: "published",
  },
];
function getPosts() {
  let p = JSON.parse(localStorage.getItem(POSTS_KEY) || "null");
  if (!p) {
    p = defaults;
    localStorage.setItem(POSTS_KEY, JSON.stringify(p));
  }
  return p;
}
function savePosts(p) {
  localStorage.setItem(POSTS_KEY, JSON.stringify(p));
}
const login = document.querySelector("#adminLogin"),
  cms = document.querySelector("#cms"),
  modal = document.querySelector("#postModal");
function showCMS() {
  login.classList.add("hidden");
  cms.classList.remove("hidden");
  render();
}
if (getSession()?.role === "admin") showCMS();
document.querySelector("#adminLoginForm").onsubmit = (e) => {
  e.preventDefault();
  if (
    adminEmail.value === "admin@demo.com" &&
    adminPassword.value === "admin123"
  ) {
    setSession({
      name: "Administrador",
      email: adminEmail.value,
      role: "admin",
    });
    showCMS();
  } else adminMsg.textContent = "Credenciais de administrador inválidas.";
};
document.querySelector("#logoutAdmin").onclick = () => {
  localStorage.removeItem(SESSION_KEY);
  location.reload();
};
function render(filter = "") {
  const posts = getPosts().filter((p) =>
    p.title.toLowerCase().includes(filter.toLowerCase()),
  );
  postList.innerHTML =
    posts
      .map(
        (p) =>
          `<article class="post-row"><a class="post-image" href="${p.link || p.image || "#"}" target="_blank" rel="noopener" title="Abrir link da notícia"><img src="${p.image || "https://placehold.co/240x140?text=Sem+imagem"}" alt=""></a><div class="post-info"><span>${p.category}</span><h3>${p.title}</h3><p>${p.excerpt || ""}</p><a href="${p.link || "#"}" target="_blank" rel="noopener">Abrir link da notícia ↗</a></div><div class="post-status ${p.status}">${p.status === "published" ? "Publicada" : "Rascunho"}</div><div class="post-actions"><button onclick="editPost(${p.id})">Editar</button><button class="danger" onclick="deletePost(${p.id})">Excluir</button></div></article>`,
      )
      .join("") || '<p class="empty">Nenhuma notícia encontrada.</p>';
  const all = getPosts();
  totalPosts.textContent = all.length;
  totalImages.textContent = all.filter((p) => p.image).length;
  totalPublished.textContent = all.filter(
    (p) => p.status === "published",
  ).length;
}
function openModal(p = {}) {
  postForm.reset();
  postId.value = p.id || "";
  postTitle.value = p.title || "";
  postCategory.value = p.category || "Brasil";
  postStatus.value = p.status || "published";
  postExcerpt.value = p.excerpt || "";
  postImage.value = p.image || "";
  postLink.value = p.link || "";
  modalTitle.textContent = p.id ? "Editar notícia" : "Nova notícia";
  updatePreview();
  modal.classList.remove("hidden");
}
function close() {
  modal.classList.add("hidden");
}
newPostBtn.onclick = () => openModal();
closeModal.onclick = cancelModal.onclick = close;
postSearch.oninput = (e) => render(e.target.value);
postImage.oninput = updatePreview;
function updatePreview() {
  imagePreview.innerHTML = postImage.value
    ? `<img src="${postImage.value}" alt="Prévia" onerror="this.parentElement.innerHTML='<span>Não foi possível carregar esta imagem</span>'">`
    : "<span>Prévia da imagem</span>";
}
postForm.onsubmit = (e) => {
  e.preventDefault();
  let posts = getPosts();
  const data = {
    id: postId.value ? Number(postId.value) : Date.now(),
    title: postTitle.value.trim(),
    category: postCategory.value,
    status: postStatus.value,
    excerpt: postExcerpt.value.trim(),
    image: postImage.value.trim(),
    link: postLink.value.trim(),
  };
  const i = posts.findIndex((p) => p.id === data.id);
  if (i >= 0) posts[i] = data;
  else posts.unshift(data);
  savePosts(posts);
  close();
  render();
};
window.editPost = (id) => openModal(getPosts().find((p) => p.id === id));
window.deletePost = (id) => {
  if (confirm("Excluir esta notícia?")) {
    savePosts(getPosts().filter((p) => p.id !== id));
    render();
  }
};
