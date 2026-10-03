(function () {
  const URL =
    "https://api.open-meteo.com/v1/forecast?latitude=-3.7319&longitude=-38.5267" +
    "&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m" +
    "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max" +
    "&timezone=America%2FFortaleza&forecast_days=4";

  const CODIGOS = {
    0: ["☀️", "Céu limpo"],
    1: ["🌤️", "Predomínio de sol"],
    2: ["⛅", "Parcialmente nublado"],
    3: ["☁️", "Nublado"],
    45: ["🌫️", "Neblina"],
    48: ["🌫️", "Neblina"],
    51: ["🌦️", "Garoa fraca"],
    53: ["🌦️", "Garoa"],
    55: ["🌦️", "Garoa forte"],
    61: ["🌧️", "Chuva fraca"],
    63: ["🌧️", "Chuva"],
    65: ["🌧️", "Chuva forte"],
    80: ["🌦️", "Pancadas de chuva"],
    81: ["🌧️", "Pancadas de chuva"],
    82: ["⛈️", "Pancadas fortes"],
    95: ["⛈️", "Trovoadas"],
    96: ["⛈️", "Trovoadas com granizo"],
    99: ["⛈️", "Trovoadas com granizo"],
  };

  const info = (c) => CODIGOS[c] || ["⛅", "Tempo variável"];
  const el = (id) => document.getElementById(id);
  const graus = (n) => Math.round(n) + "°";

  function nomeDia(iso, i) {
    if (i === 0) return "Hoje";
    if (i === 1) return "Amanhã";
    const d = new Date(iso + "T12:00:00");
    return d.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", "");
  }

  function mostrar(d) {
    const [icone, desc] = info(d.current.weather_code);
    el("climaIcone").textContent = icone;
    el("climaTemp").textContent = graus(d.current.temperature_2m);
    el("climaDesc").textContent = desc;
    el("climaSensacao").textContent = graus(d.current.apparent_temperature);
    el("climaUmidade").textContent =
      Math.round(d.current.relative_humidity_2m) + "%";
    el("climaVento").textContent =
      Math.round(d.current.wind_speed_10m) + " km/h";

    const dd = d.daily;
    el("climaDias").innerHTML = dd.time
      .slice(1, 4)
      .map((data, k) => {
        const i = k + 1;
        const [ic, ds] = info(dd.weather_code[i]);
        return (
          '<li title="' +
          ds +
          '">' +
          '<span class="dia-nome">' +
          nomeDia(data, i) +
          "</span>" +
          '<span class="dia-icone" aria-hidden="true">' +
          ic +
          "</span>" +
          "<span><b>" +
          graus(dd.temperature_2m_max[i]) +
          "</b> / " +
          graus(dd.temperature_2m_min[i]) +
          "</span>" +
          '<span class="dia-chuva">Chuva ' +
          Math.round(dd.precipitation_probability_max[i] || 0) +
          "%</span>" +
          "</li>"
        );
      })
      .join("");
  }

  function erro() {
    el("climaDesc").textContent = "Previsão indisponível no momento";
    el("climaTemp").textContent = "--°";
  }

  if (!el("clima")) return;
  fetch(URL)
    .then((r) => (r.ok ? r.json() : Promise.reject()))
    .then(mostrar)
    .catch(erro);
})();
