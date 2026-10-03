/* Edição do dia: escolhe a edição pelo horário de Fortaleza e desenha a régua do topo */
(function () {
  var NOMES = { madrugada: "madrugada", manha: "manhã", tarde: "tarde", noite: "noite" };
  var raiz = document.documentElement;
  function hora() {
    var d = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Fortaleza" }));
    return d.getHours() + d.getMinutes() / 60;
  }
  function automatica() {
    var h = hora();
    return h < 5 ? "madrugada" : h < 12 ? "manha" : h < 18 ? "tarde" : "noite";
  }
  function lerEscolha() {
    try { return localStorage.getItem("edicao") || "auto"; } catch (e) { return "auto"; }
  }
  function aplicar(escolha) {
    raiz.dataset.edicao = escolha === "auto" ? automatica() : escolha;
    try { localStorage.setItem("edicao", escolha); } catch (e) {}
  }
  aplicar(lerEscolha());

  document.addEventListener("DOMContentLoaded", function () {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var regua = document.createElement("div");
    regua.className = "regua";
    regua.setAttribute("role", "group");
    regua.setAttribute("aria-label", "Edição do dia");
    regua.innerHTML =
      '<span class="regua-nome" aria-live="polite"></span>' +
      '<div class="regua-trilho" aria-hidden="true"><i class="regua-sol"></i></div>' +
      '<div class="regua-botoes">' +
      Object.keys(NOMES).map(function (k) { return '<button type="button" data-ed="' + k + '">' + NOMES[k] + "</button>"; }).join("") +
      '<button type="button" data-ed="auto">agora</button></div>';
    header.before(regua);
    regua.querySelector(".regua-sol").style.left = (hora() / 24) * 100 + "%";
    function marcar() {
      var e = lerEscolha();
      regua.querySelector(".regua-nome").textContent = "Edição da " + NOMES[raiz.dataset.edicao];
      regua.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.ed === e)); });
    }
    regua.addEventListener("click", function (ev) {
      var b = ev.target.closest("button");
      if (!b) return;
      aplicar(b.dataset.ed);
      marcar();
    });
    marcar();
  });
})();
