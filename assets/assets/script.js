// --- Dynamic language switch ---
const translations = {
  fr: {
    home: "Accueil",
    about: "À propos",
    contact: "Contact",
    tagline: "Votre partenaire immobilier en Méditerranée",
    consulting: "PROPERTY CONSULTING - by Serafina LOGGIA",
    email: "Écrivez à : MediterraneaPropertyConsulting@proton.me"
  },
  en: {
    home: "Home",
    about: "About",
    contact: "Contact",
    tagline: "Your Mediterranean Real Estate Partner",
    consulting: "PROPERTY CONSULTING - by Serafina LOGGIA",
    email: "Write to: MediterraneaPropertyConsulting@proton.me"
  },
  it: {
    home: "Home",
    about: "Chi siamo",
    contact: "Contatti",
    tagline: "Il tuo partner immobiliare nel Mediterraneo",
    consulting: "PROPERTY CONSULTING - by Serafina LOGGIA",
    email: "Scrivi a: MediterraneaPropertyConsulting@proton.me"
  }
};

let currentLang = "fr";

function switchLang(lang) {
  currentLang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) el.innerText = translations[lang][key];
  });
  document.querySelectorAll(".lang-switch button").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}

// --- Email reveal with temporary display ---
function revealEmail() {
  const box = document.getElementById("emailBox");
  const text = document.getElementById("emailText");
  const email = "MediterraneaPropertyConsulting@proton.me";
  text.textContent = email;
  box.style.display = "block";
  setTimeout(() => {
    box.style.display = "none";
  }, 6000);
}

// --- Copy email to clipboard ---
function copyEmail() {
  const email = document.getElementById("emailText").textContent;
  navigator.clipboard.writeText(email);
  alert("Adresse copiée !");
}
