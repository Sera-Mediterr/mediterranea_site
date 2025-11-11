// Gestion du changement de langue
function switchLang(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = translations[lang][el.dataset.i18n];
  });
  document.querySelectorAll('.lang-switch button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

const translations = {
  fr: {
    tagline: "Votre partenaire immobilier en Méditerranée",
    consulting: "PROPERTY CONSULTING - par Serafina LOGGIA",
    about: "À propos"
  },
  it: {
    tagline: "Il tuo partner immobiliare nel Mediterraneo",
    consulting: "PROPERTY CONSULTING - di Serafina LOGGIA",
    about: "Chi siamo"
  },
  en: {
    tagline: "Your real estate partner in the Mediterranean",
    consulting: "PROPERTY CONSULTING - by Serafina LOGGIA",
    about: "About"
  }
};

// Bouton e-mail : affiche et copie
function revealEmail() {
  const box = document.getElementById("emailBox");
  const text = document.getElementById("emailText");
  text.textContent = "MediterraneaPropertyConsulting[a]proton.me";
  box.style.display = "block";
}

function copyEmail() {
  const text = document.getElementById("emailText").textContent;
  navigator.clipboard.writeText(text.replace("[a]", "@"));
  alert("Adresse copiée !");
}
