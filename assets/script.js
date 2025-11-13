// =========================
//  TRADUCTIONS
// =========================
const translations = {
  fr: {
    tagline: "Votre partenaire immobilier en Méditerranée",
    subtitle:
      "Conseil acheteur (FR–EN–IT). Spécialiste Espagne & Maroc : recherche, analyse, visites, négociation, sécurisation jusqu’à l’acte.",
    about_title: "À propos",
    about_body:
      "Je m'appelle Serafina LOGGIA. J’accompagne des acheteurs pour investir ou s’installer en Espagne et au Maroc. Mon rôle : filtrer les biens, vérifier, organiser les visites, négocier, coordonner les démarches et sécuriser l’opération jusqu’à la signature.",
    services_title: "Ce que j’apporte"
  },
  en: {
    tagline: "Your Mediterranean property partner",
    subtitle:
      "Buyer’s agent (FR–EN–IT). Focus on Spain & Morocco: search, due diligence, viewings, negotiation, deal security up to completion.",
    about_title: "About",
    about_body:
      "I’m Serafina LOGGIA. I help buyers invest or relocate to Spain and Morocco. I shortlist properties, verify information, organise viewings, negotiate, coordinate all steps and secure the deal up to completion.",
    services_title: "What I bring"
  },
  it: {
    tagline: "La tua consulente immobiliare nel Mediterraneo",
    subtitle:
      "Consulenza acquirente (FR–EN–IT). Focus Spagna & Marocco: ricerca, verifiche, visite, negoziazione, sicurezza fino al rogito.",
    about_title: "Chi sono",
    about_body:
      "Sono Serafina LOGGIA. Accompagno chi vuole investire o trasferirsi in Spagna e Marocco. Seleziono gli immobili, verifico le informazioni, organizzo le visite, negozio, coordino le pratiche e rendo l’operazione sicura fino al rogito.",
    services_title: "Cosa offro"
  }
};

// Applique une langue sur tous les éléments [data-i18n]
function applyLang(lang) {
  const dict = translations[lang];
  if (!dict) return;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) {
      el.textContent = dict[key];
    }
  });

  // met à jour les boutons FR / EN / IT
  document.querySelectorAll(".lang-switch button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  // attribut lang sur <html>
  document.documentElement.lang = lang;
}

// appelée par les boutons dans le HTML
function switchLang(lang) {
  applyLang(lang);
}

// Au chargement de la page : FR par défaut
document.addEventListener("DOMContentLoaded", () => {
  applyLang("fr");
});

// =========================
//  EMAIL : AFFICHAGE & COPIE
// =========================

// Affiche la boîte e-mail pour 'Top' (hero) ou autre suffixe
function revealEmail(place) {
  const box = document.getElementById("emailBox" + place);
  const trigger = document.getElementById("showEmail" + place);
  if (box) box.style.display = "block";
  if (trigger) trigger.style.display = "none";
}

// Copie l’adresse depuis différents emplacements
function copyEmail(target) {
  let span = null;

  // cas "Top" (pill bleu du hero)
  if (target === "Top" || target === "Bottom") {
    span = document.getElementById("emailText" + target);
  } else if (target) {
    // cas : id direct (ex: "emailText-tem")
    span = document.getElementById(target);
  } else {
    // fallback : texte du hero
    span = document.getElementById("emailTextTop");
  }

  if (!span) return;

  const email = span.textContent.trim().replace("[a]", "@");

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).catch(() => {});
  } else {
    // vieux navigateurs
    const tmp = document.createElement("textarea");
    tmp.value = email;
    document.body.appendChild(tmp);
    tmp.select();
    try {
      document.execCommand("copy");
    } catch (e) {}
    document.body.removeChild(tmp);
  }

  // ferme la petite boîte si elle existe
  const box = span.closest(".email-box");
  if (box) box.style.display = "none";
}

// Pour le lien "envoyer un témoignage"
function showEmailBox(suffix) {
  const link = document.getElementById("emailLink-" + suffix);
  const box = document.getElementById("emailBox-" + suffix);
  if (link) link.style.display = "none";
  if (box) box.style.display = "block";
}

// =========================
//  MODALES "Ce que j’apporte"
// =========================

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
  // clic sur une carte de service
  const card = e.target.closest(".link-card");
  if (card && card.dataset.modal) {
    e.preventDefault();
    openModal(card.dataset.modal);
  }

  // clic sur boutons de fermeture ou backdrop
  if (e.target.matches("[data-close], .modal-backdrop")) {
    closeModal(e.target.closest(".modal"));
  }

  // défilement fluide pour les liens ancres (#...)
  const a = e.target.closest('a[href^="#"]');
  if (a) {
    const id = a.getAttribute("href").slice(1);
    const targetEl = document.getElementById(id);
    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
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
