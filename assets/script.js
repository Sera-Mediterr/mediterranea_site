// ---- Traductions (pitch inclus) ----
const translations = {
  fr: {
    tagline: "Votre partenaire immobilier en Méditerranée",
    subtitle: "Conseil et accompagnement FR–IT pour acheter, louer ou se relocaliser.",
    about_title: "À propos",
    about_body:
      "Je suis Serafina LOGGIA. J’accompagne des clients francophones et italophones pour acheter, louer ou se relocaliser entre France et Italie. Mon approche : sélection exigeante des biens, explications claires des démarches, négociation au service de vos intérêts, et un suivi humain jusqu’à l’installation.",
    services_title: "Ce que j’apporte",
    s1: "Recherche & présélection pertinentes",
    s2: "Visites (présentiel / vidéo) & comptes rendus",
    s3: "Négociation & sécurisation de l’opération",
    s4: "Relocation : contrats, écoles, mobilité",
  },
  it: {
    tagline: "Il tuo partner immobiliare nel Mediterraneo",
    subtitle: "Consulenza FR–IT per comprare, affittare o trasferirsi.",
    about_title: "Chi sono",
    about_body:
      "Sono Serafina LOGGIA. Accompagno clienti francofoni e italofoni ad acquistare, affittare o trasferirsi tra Francia e Italia. Approccio umano e chiaro: selezione mirata, iter spiegato, negoziazione dalla tua parte e follow-up fino all’insediamento.",
    services_title: "Cosa offro",
    s1: "Ricerca e preselezione mirata",
    s2: "Visite (presenza / video) e report",
    s3: "Negoziazione e sicurezza dell’operazione",
    s4: "Relocation: contratti, scuole, mobilità",
  },
  en: {
    tagline: "Your Mediterranean real estate partner",
    subtitle: "FR–IT advisory to buy, rent or relocate.",
    about_title: "About",
    about_body:
      "I’m Serafina LOGGIA. I help French- and Italian-speaking clients buy, rent or relocate across France and Italy. Human, bilingual support: targeted search, clear steps, strong negotiation and follow-through to settling in.",
    services_title: "What I bring",
    s1: "Targeted search & shortlisting",
    s2: "Viewings (in-person / video) & reporting",
    s3: "Negotiation & deal security",
    s4: "Relocation: contracts, schools, mobility",
  },
};

function switchLang(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const k = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][k] !== undefined) {
      el.textContent = translations[lang][k];
    }
  });
  document.querySelectorAll(".lang-switch button").forEach(b=>{
    b.classList.toggle("active", b.dataset.lang === lang);
  });
}

// ---- Bouton E-mail (obfusqué + copier + disparaît) ----
function revealEmail() {
  const box = document.getElementById("emailBox");
  const text = document.getElementById("emailText");
  const email = "MediterraneaPropertyConsulting[a]protonmail.com";
  text.textContent = email;
  box.style.display = "block";
  setTimeout(()=>{ box.style.display = "none"; }, 6000);
}
function copyEmail() {
  const raw = (document.getElementById("emailText").textContent || "");
  const real = raw.replace("[a]", "@");
  navigator.clipboard.writeText(real);
  alert("Adresse copiée !");
}

// Langue par défaut au chargement
switchLang("fr");
