// =============================
//  TRADUCTIONS FR / EN / IT
// =============================
var translations = {
  fr: {
    brand: "PROPERTY CONSULTING – by Serafina LOGGIA",
    hero_title: "Mediterranea Property Consulting",

    tagline: "Votre partenaire immobilier en Méditerranée",
    subtitle:
      "Conseil acheteur (FR–EN–IT). Spécialiste Espagne & Maroc : recherche, analyse, visites, négociation, sécurisation jusqu’à l’acte.",

    about_title: "À propos",
    about_body:
      "Je m'appelle Serafina LOGGIA. J’accompagne des acheteurs pour investir ou s’installer en Espagne et au Maroc. Mon rôle : filtrer les biens, vérifier, organiser les visites, négocier, coordonner les démarches et sécuriser l’opération jusqu’à la signature.",

    services_title: "Ce que j’apporte"
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

    services_title: "What I deliver"
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

    services_title: "Cosa offro"
  }
};

// =============================
//  CHANGEMENT DE LANGUE
// =============================
function switchLang(lang) {
  var dict = translations[lang];
  if (!dict) return;

  var nodes = document.querySelectorAll("[data-i18n]");
  for (var i = 0; i < nodes.length; i++) {
    var el = nodes[i];
    var key = el.getAttribute("data-i18n");
    if (dict.hasOwnProperty(key)) {
      el.textContent = dict[key];
    }
  }

  var btns = document.querySelectorAll(".lang-switch button");
  for (var j = 0; j < btns.length; j++) {
    var b = btns[j];
    b.classList.toggle("active", b.getAttribute("data-lang") === lang);
  }
}

// =============================
//  EMAILS : AFFICHER / COPIER
// =============================

// Affiche la boîte e-mail (Top / Bottom) et masque le bouton
function revealEmail(place) {
  var box = document.getElementById("emailBox" + place);
  var btn = document.getElementById("showEmail" + place);
  if (box) box.style.display = "block";
  if (btn) btn.style.display = "none";
}

// Affiche le bloc e-mail pour les témoignages
function showEmailBox(suffix) {
  var link = document.getElementById("emailLink-" + suffix);
  var box = document.getElementById("emailBox-" + suffix);
  if (link) link.style.display = "none";
  if (box) box.style.display = "block";
}

// Copie l’adresse depuis un span donné
// - copyEmail('Top') ou copyEmail('Bottom') pour les blocs hero / contact
// - copyEmail('emailText-tem') pour les témoignages
// - copyEmail() sans argument : utilise emailTextBottom par défaut
function copyEmail(target) {
  var span;

  if (!target) {
    span = document.getElementById("emailTextBottom");
  } else if (target === "Top" || target === "Bottom") {
    span = document.getElementById("emailText" + target);
  } else {
    span = document.getElementById(target);
  }

  if (!span) return;

  var raw = span.innerText || span.textContent;
  var txt = raw.replace("[a]", "@");

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(txt).catch(function () {});
  } else {
    var tmp = document.createElement("textarea");
    tmp.value = txt;
    document.body.appendChild(tmp);
    tmp.select();
    try {
      document.execCommand("copy");
    } catch (e) {}
    document.body.removeChild(tmp);
  }

  var box = span.closest ? span.closest(".email-box") : null;
  if (box) box.style.display = "none";
}

// =============================
//  MODALES (services)
// =============================
function openModal(id) {
  var m = document.getElementById(id);
  if (!m) return;
  m.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  var dlg = m.querySelector(".modal-dialog");
  if (dlg) dlg.focus();
}

function closeModal(m) {
  if (!m) return;
  m.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.addEventListener("click", function (e) {
  // Cartes "Ce que j’apporte"
  var card = e.target.closest ? e.target.closest(".link-card") : null;
  if (card && card.dataset && card.dataset.modal) {
    e.preventDefault();
    openModal(card.dataset.modal);
    return;
  }

  // Boutons de fermeture / backdrop
  if (e.target.matches && e.target.matches("[data-close]")) {
    closeModal(e.target.closest(".modal"));
    return;
  }

  // Défilement fluide vers les ancres (#contact, #pour-qui, etc.)
  var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
  if (a) {
    var href = a.getAttribute("href");
    var id = href.slice(1);
    var el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
});

// Touche ESC pour fermer les modales
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    var open = document.querySelectorAll('.modal[aria-hidden="false"]');
    for (var i = 0; i < open.length; i++) {
      closeModal(open[i]);
    }
  }
});

// =============================
//  REDIRECTION BOUTON GAMMA
// =============================

// Si tu veux être sûre que le bouton Gamma marche même sans href,
// tu peux lui ajouter un id dans le HTML (par ex. id="btn-gamma")
// et décommenter ce bloc :

/*
document.addEventListener("DOMContentLoaded", function () {
  var gammaBtn = document.getElementById("btn-gamma");
  if (gammaBtn) {
    gammaBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.open(
        "https://mediterranea-property-co-nvhlz6d.gamma.site/",
        "_blank"
      );
    });
  }
});
*/

// =============================
//  INIT : langue par défaut
// =============================
document.addEventListener("DOMContentLoaded", function () {
  switchLang("fr");
});
Fix full JS
