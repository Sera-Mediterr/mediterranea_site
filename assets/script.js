// ===== TRADUCTIONS =====
const translations = {
  fr: {
    tagline: "Votre partenaire immobilier en Méditerranée",
    subtitle:
      "Conseil acheteur (FR–EN–IT). Spécialiste Espagne & Maroc : recherche, analyse, visites, négociation, sécurisation jusqu’à l’acte.",
    about_title: "À propos",
    about_body:
      "Je m'appelle Serafina LOGGIA. J’accompagne des acheteurs pour investir ou s’installer en Espagne et au Maroc. Mon rôle : filtrer les biens, vérifier, organiser les visites, négocier, coordonner les démarches et sécuriser l’opération jusqu’à la signature.",
    services_title: "Ce que j’apporte",
    s1: "Recherche ciblée & présélection",
    s2: "Visites (présentiel / vidéo) & comptes rendus",
    s3: "Négociation & sécurisation jusqu’à l’acte",
    s4: "Coordination locale (notaires, trad, démarches)"
  },
  en: {
    tagline: "Your Mediterranean buying advisor",
    subtitle:
      "Buyer’s agent (FR–EN–IT). Focus on Spain & Morocco: search, due diligence, viewings, negotiation, deal security to completion.",
    about_title: "About",
    about_body:
      "I’m Serafina LOGGIA. I support buyers in Spain and Morocco. I shortlist properties, verify information, arrange viewings, negotiate, coordinate the process and secure the deal up to completion.",
    services_title: "What I deliver",
    s1: "Targeted search & shortlisting",
    s2: "Viewings (in-person / video) & reporting",
    s3: "Negotiation & deal security to completion",
    s4: "Local coordination (notaries, translations, admin)"
  },
  it: {
    tagline: "La tua consulente per acquistare nel Mediterraneo",
    subtitle:
      "Consulenza acquirente (FR–EN–IT). Focus Spagna & Marocco: ricerca, verifica, visite, negoziazione, sicurezza fino al rogito.",
    about_title: "Chi sono",
    about_body:
      "Sono Serafina LOGGIA. Accompagno chi acquista in Spagna e Marocco: preselezione immobili, verifiche, visite, negoziazione, coordinamento pratiche e sicurezza fino al rogito.",
    services_title: "Cosa offro",
    s1: "Ricerca mirata & preselezione",
    s2: "Visite (in presenza / video) & report",
    s3: "Negoziazione & sicurezza fino al rogito",
    s4: "Coordinamento locale (notai, traduzioni, pratiche)"
  }
};

// ===== CHANGEMENT DE LANGUE =====
function switchLang(lang) {
  const dict = translations[lang];
  if (!dict) return;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) {
      el.textContent = dict[key];
    }
  });

  // état visuel des boutons
  document.querySelectorAll(".lang-switch button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}

// langue par défaut
document.addEventListener("DOMContentLoaded", () => {
  switchLang("fr");
});

// ===== GESTION E-MAIL (HÉRO + TÉMOIGNAGES) =====

// Affiche la boîte e-mail du héros (Top)
function revealEmail(place) {
  const box = document.getElementById("emailBox" + place);
  const btn = document.getElementById("showEmail" + place);
  if (box) box.style.display = "block";
  if (btn) btn.style.display = "none";
}

// Affiche la petite boîte pour les témoignages
function showEmailBox(suffix) {
  const link = document.getElementById("emailLink-" + suffix);
  const box = document.getElementById("emailBox-" + suffix);
  if (link) link.style.display = "none";
  if (box) box.style.display = "block";
}

// Copie l'adresse e-mail (héros + bas de page + témoignages)
function copyEmail(target) {
  let span = null;

  // cas "Top" / "Bottom"
  if (!target || target === "Top" || target === "Bottom") {
    const suffix = target || "Top";
    span = document.getElementById("emailText" + suffix);
  } else {
    // cas "emailText-tem", etc.
    span = document.getElementById(target);
  }

  if (!span) return;

  const txt = span.textContent.trim().replace("[a]", "@");

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(txt).catch(() => {});
  } else {
    const tmp = document.createElement("textarea");
    tmp.value = txt;
    document.body.appendChild(tmp);
    tmp.select();
    try {
      document.execCommand("copy");
    } catch (e) {}
    document.body.removeChild(tmp);
  }
}

// ===== MODALES =====
function openModal(id) {
  const m = document.getElementById(id);
  if (!m) return;
  m.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  const dlg = m.querySelector(".modal-dialog");
  if (dlg) dlg.focus();
}

function closeModal(m) {
  if (!m) return;
  m.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.addEventListener("click", (e) => {
  const card = e.target.closest(".link-card");
  if (card && card.dataset.modal) {
    e.preventDefault();
    openModal(card.dataset.modal);
  }

  if (e.target.matches("[data-close]")) {
    closeModal(e.target.closest(".modal"));
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document
      .querySelectorAll('.modal[aria-hidden="false"]')
      .forEach((m) => closeModal(m));
  }
});

// ===== DÉFILEMENT FLUIDE VERS LES ANCRES =====
document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute("href").slice(1);
  const el = document.getElementById(id);
  if (!el) return;

  e.preventDefault();
  el.scrollIntoView({ behavior: "smooth", block: "start" });
});
