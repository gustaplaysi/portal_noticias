/**
 * Clima em tempo real — Correio Digital
 * Fonte: Open-Meteo (sem chave de API).
 * Local padrão do portal: Fortaleza, CE.
 * Atualiza ao carregar, a cada 10 minutos e ao voltar para a aba.
 */
(function () {
  "use strict";

  const LOCAL = {
    nome: "Fortaleza, CE",
    latitude: -3.7319,
    longitude: -38.5267,
    timezone: "America/Fortaleza",
  };
  const INTERVALO_ATUALIZACAO = 10 * 60 * 1000;
  let ultimaAtualizacao = 0;
  let carregando = false;

  const CODIGOS = {
    0: ["☀️", "Céu limpo"],
    1: ["🌤️", "Predomínio de sol"],
    2: ["⛅", "Parcialmente nublado"],
    3: ["☁️", "Nublado"],
    45: ["🌫️", "Neblina"],
    48: ["🌫️", "Neblina com geada"],
    51: ["🌦️", "Garoa fraca"],
    53: ["🌦️", "Garoa"],
    55: ["🌧️", "Garoa forte"],
    56: ["🌧️", "Garoa congelante"],
    57: ["🌧️", "Garoa congelante forte"],
    61: ["🌧️", "Chuva fraca"],
    63: ["🌧️", "Chuva"],
    65: ["🌧️", "Chuva forte"],
    66: ["🌧️", "Chuva congelante"],
    67: ["🌧️", "Chuva congelante forte"],
    71: ["🌨️", "Neve fraca"],
    73: ["🌨️", "Neve"],
    75: ["🌨️", "Neve forte"],
    77: ["🌨️", "Grãos de neve"],
    80: ["🌦️", "Pancadas de chuva"],
    81: ["🌧️", "Pancadas de chuva"],
    82: ["⛈️", "Pancadas fortes"],
    85: ["🌨️", "Pancadas de neve"],
    86: ["🌨️", "Pancadas fortes de neve"],
    95: ["⛈️", "Trovoadas"],
    96: ["⛈️", "Trovoadas com granizo"],
    99: ["⛈️", "Trovoadas fortes com granizo"],
  };

  const el = (id) => document.getElementById(id);
  const setText = (id, valor) => {
    const no = el(id);
    if (no) no.textContent = valor;
  };
  const info = (codigo) => CODIGOS[codigo] || ["⛅", "Tempo variável"];
  const graus = (valor) =>
    Number.isFinite(Number(valor)) ? `${Math.round(Number(valor))}°C` : "--°C";

  function criarURL() {
    const params = new URLSearchParams({
      latitude: String(LOCAL.latitude),
      longitude: String(LOCAL.longitude),
      current:
        "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m",
      daily:
        "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
      timezone: LOCAL.timezone,
      forecast_days: "4",
    });
    return `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
  }

  function nomeDia(iso, indice) {
    if (indice === 0) return "Hoje";
    if (indice === 1) return "Amanhã";
    return new Date(`${iso}T12:00:00`)
      .toLocaleDateString("pt-BR", { weekday: "short" })
      .replace(".", "");
  }

  function mostrar(dados) {
    if (!dados || !dados.current)
      throw new Error("Resposta meteorológica inválida");
    const [icone, descricao] = info(dados.current.weather_code);
    setText("topCity", LOCAL.nome);
    setText("climaIcone", icone);
    setText("climaTemp", graus(dados.current.temperature_2m));
    setText("climaDesc", descricao);
    setText("climaSensacao", graus(dados.current.apparent_temperature));
    setText(
      "climaUmidade",
      `${Math.round(dados.current.relative_humidity_2m)}%`,
    );
    setText("climaVento", `${Math.round(dados.current.wind_speed_10m)} km/h`);

    const lista = el("climaDias");
    const dd = dados.daily;
    if (lista && dd && Array.isArray(dd.time)) {
      lista.innerHTML = dd.time
        .slice(1, 4)
        .map((data, k) => {
          const i = k + 1;
          const [ic, ds] = info(dd.weather_code[i]);
          const chuva = Math.round(dd.precipitation_probability_max?.[i] || 0);
          return `<li title="${ds}"><span class="dia-nome">${nomeDia(data, i)}</span><span class="dia-icone" aria-hidden="true">${ic}</span><span><b>${graus(dd.temperature_2m_max[i])}</b> / ${graus(dd.temperature_2m_min[i])}</span><span class="dia-chuva">Chuva ${chuva}%</span></li>`;
        })
        .join("");
    }
  }

  function mostrarErro() {
    setText("climaTemp", "--°C");
    setText("climaDesc", "Clima indisponível");
  }

  async function atualizarClima(forcar = false) {
    if (carregando || (!forcar && Date.now() - ultimaAtualizacao < 60_000))
      return;
    carregando = true;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
      const resposta = await fetch(criarURL(), {
        cache: "no-store",
        signal: controller.signal,
      });
      if (!resposta.ok) throw new Error(`Open-Meteo HTTP ${resposta.status}`);
      mostrar(await resposta.json());
      ultimaAtualizacao = Date.now();
    } catch (erro) {
      console.warn("Não foi possível atualizar o clima:", erro);
      if (!ultimaAtualizacao) mostrarErro();
    } finally {
      clearTimeout(timeout);
      carregando = false;
    }
  }

  if (!el("climaTemp")) return;
  atualizarClima(true);
  setInterval(() => atualizarClima(true), INTERVALO_ATUALIZACAO);
  document.addEventListener("visibilitychange", () => {
    if (
      !document.hidden &&
      Date.now() - ultimaAtualizacao >= INTERVALO_ATUALIZACAO
    )
      atualizarClima(true);
  });
})();
