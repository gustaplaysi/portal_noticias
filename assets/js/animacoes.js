(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!("IntersectionObserver" in window)) return;

  const alvos = document.querySelectorAll(
    ".news-card, .compact-card, .video-card, .story-card, .region-card, .section-heading, .newsletter-inner, .clima",
  );
  const io = new IntersectionObserver(
    (itens) => {
      itens.forEach((i) => {
        if (i.isIntersecting) {
          i.target.classList.add("visible");
          io.unobserve(i.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  alvos.forEach((el, n) => {
    el.classList.add("reveal");
    el.style.transitionDelay = (n % 3) * 80 + "ms";
    io.observe(el);
    // remove o atraso depois de aparecer para não atrapalhar o hover
    el.addEventListener(
      "transitionend",
      () => (el.style.transitionDelay = ""),
      { once: true },
    );
  });

  // Aba clicada: pulso rápido
  document.querySelectorAll(".nav-scroll a").forEach((a) =>
    a.addEventListener("click", () => {
      a.animate(
        [
          { transform: "scale(1)" },
          { transform: "scale(1.12)" },
          { transform: "scale(1)" },
        ],
        { duration: 250, easing: "ease-out" },
      );
    }),
  );
})();
