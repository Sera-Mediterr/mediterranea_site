// =============================
//  TRADUCTIONS FR / EN / IT
// =============================
const translations = {
  fr: {
    brand: "PROPERTY CONSULTING – by Serafina LOGGIA",
    hero_title: "Mediterranea Property Consulting",

    tagline: "Votre partenaire immobilier en Méditerranée",
    subtitle:
      "Conseil acheteur (FR–EN–IT). Spécialiste Espagne & Maroc : recherche, analyse, visites, négociation, sécurisation jusqu’à l’acte.",

    about_title: "À propos",
    about_body:
      "Je m'appelle Serafina LOGGIA. J’accompagne des acheteurs pour investir ou s’installer en Espagne et au Maroc. Mon rôle : filtrer les biens, vérifier, organiser les visites, négocier, coordonner les démarches et sécuriser l’opération jusqu’à la signature.",

    services_title: "Ce que j’apporte",
    s1_title: "Recherche ciblée & présélection",
    s2_title: "Visites (présentiel / vidéo) & comptes rendus",
    s3_title: "Négociation & sécurisation jusqu’à l’acte",
    s4_title: "Coordination locale (notaires, trad, démarches)",
  },

  en: {
    brand: "PROPERTY CONSULTING – by Serafina LOGGIA",
    hero_title: "Mediterranea Property Consulting",

    tagline: "Your Mediterranean real estate partner",
    subtitle:
      "Buyer’s advisor (FR–EN–IT). Focus on Spain & Morocco: search, analysis, viewings, negotiation and deal security up to completion.",

    about_title: "About",
    about_body:
      "I’m Serafina LOGGIA. I support buyers who want to invest or relocate to Spain or Morocco. My role: shortlist properties, verify information, organise viewings, negotiate, coordinate all procedures and secure the deal up to completion.",

    services_title: "What I deliver",
    s1_title: "Targeted search & shortlisting",
    s2_title: "Viewings (in-person / video) & reporting",
    s3_title: "Negotiation & deal security to completion",
    s4_title: "Local coordination (notaries, translations, admin)",
  },

  it: {
    brand: "PROPERTY CONSULTING – by Serafina LOGGIA",
    hero_title: "Mediterranea Property Consulting",

    tagline: "Il tuo partner immobiliare nel Mediterraneo",
    subtitle:
      "Consulenza acquirente (FR–EN–IT). Focus Spagna e Marocco: ricerca, analisi, visite, negoziazione e sicurezza fino al rogito.",

    about_title: "Chi sono",
    about_body:
      "Sono Serafina LOGGIA. Accompagno chi desidera investire o trasferirsi in Spagna o in Marocco. Il mio ruolo: selezionare gli immobili, verificare le informazioni, organizzare le visite, negoziare, coordinare le pratiche e mettere in sicurezza l’operazione fino al rogito.",

    services_title: "Cosa offro",
    s1_title: "Ricerca mirata & preselezione",
    s2_title: "Visite (in presenza / video) & report",
    s3_title: "Negoziazione & sicurezza fino al rogito",
    s4_title: "Coordinamento locale (notai, traduzioni, pratiche)",
  },
};

// =============================
//  CHANGEMENT DE LANGUE
// =============================
function switchLang(lang) {
  const dict = translations[lang];
  if (!dict) return;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) {
      el.textContent = dict[key];
    }
  });

  document.querySelectorAll(".lang-switch button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}

// langue par défaut au chargement
switchLang("fr");

// =============================
//  EMAIL : AFFICHER / COPIER
// =============================

// Affiche la boîte e-mail (Top / Bottom) et masque le bouton
function revealEmail(place) {
  const box = document.getElementById("emailBox" + place);
  const btn = document.getElementById("showEmail" + place);
  if (box) box.style.display = "block";
  if (btn) btn.style.display = "none";
}

// Affiche un petit bloc e-mail contextuel (témoignages)
function showEmailBox(suffix) {
  const link = document.getElementById("emailLink-" + suffix);
  const box = document.getElementById("emailBox-" + suffix);
  if (link) link.style.display = "none";
  if (box) box.style.display = "block";
}

// Copie l’adresse depuis un span spécifique
// - cas général : copyEmail('emailText-tem')
// - cas Top / Bottom : copyEmail('Top') ou copyEmail('Bottom')
// - sans argument : utilise emailTextBottom par défaut
function copyEmail(target) {
  let span = null;

  if (!target) {
    span = document.getElementById("emailTextBottom");
  } else if (target === "Top" || target === "Bottom") {
    span = document.getElementById("emailText" + target);
  } else {
    span = document.getElementById(target);
  }

  if (!span) return;

  const raw = span.innerText.trim();
  const txt = raw.replace("[a]", "@");

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

  const box = span.closest(".email-box");
  if (box) {
    box.style.display = "none";
  }
}

// =============================
//  MODALES (cartes de services)
// =============================
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
  // ouverture d’une modale via une carte
  const btn = e.target.closest(".link-card");
  if (btn && btn.dataset.modal) {
    e.preventDefault();
    openModal(btn.dataset.modal);
  }

  // fermeture via les éléments [data-close]
  if (e.target.matches("[data-close]")) {
    closeModal(e.target.closest(".modal"));
  }

  // défilement fluide pour les ancres internes
  const a = e.target.closest('a[href^="#"]');
  if (a) {
    const id = a.getAttribute("href").slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document
      .querySelectorAll('.modal[aria-hidden="false"]')
      .forEach((m) => closeModal(m));
  }
});
Fix script.js
