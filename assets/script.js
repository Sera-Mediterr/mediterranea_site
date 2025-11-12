// ---- Traductions (pitch inclus) ----
const translations = {
  fr: {
    tagline: "Votre partenaire immobilier en Méditerranée",
    subtitle: "Conseil acheteur (FR–EN–IT). Spécialiste Espagne & Maroc : recherche, analyse, visites, négociation, sécurisation jusqu’à l’acte.",
    about_title: "À propos",
    about_body:
      "Je suis Serafina LOGGIA. J’accompagne des acheteurs pour investir ou s’installer en Espagne et au Maroc. Mon rôle : filtrer les biens, vérifier, organiser les visites, négocier, coordonner les démarches et sécuriser l’opération jusqu’à la signature.",
    services_title: "Ce que j’apporte",
    s1: "Recherche ciblée & présélection",
    s2: "Visites (présentiel / vidéo) & comptes rendus",
    s3: "Négociation & sécurisation jusqu’à l’acte",
    s4: "Coordination locale (notaires, trad, démarches)",
  },
  en: {
    tagline: "Your Mediterranean buying advisor",
    subtitle: "Buyer’s agent (FR–EN–IT). Focus on Spain & Morocco: search, due diligence, viewings, negotiation, deal security to completion.",
    about_title: "About",
    about_body:
      "I’m Serafina LOGGIA. I support buyers in Spain and Morocco. I shortlist properties, verify information, arrange viewings, negotiate, coordinate the process and secure the deal up to completion.",
    services_title: "What I deliver",
    s1: "Targeted search & shortlisting",
    s2: "Viewings (in-person / video) & reporting",
    s3: "Negotiation & deal security to completion",
    s4: "Local coordination (notaries, translations, admin)",
  },
  it: {
    tagline: "La tua consulente per acquistare nel Mediterraneo",
    subtitle: "Consulenza acquirente (FR–EN–IT). Focus Spagna & Marocco: ricerca, verifica, visite, negoziazione, sicurezza fino al rogito.",
    about_title: "Chi sono",
    about_body:
      "Sono Serafina LOGGIA. Accompagno chi acquista in Spagna e Marocco: preselezione immobili, verifiche, visite, negoziazione, coordinamento pratiche e sicurezza fino al rogito.",
    services_title: "Cosa offro",
    s1: "Ricerca mirata & preselezione",
    s2: "Visite (presenza / video) & report",
    s3: "Negoziazione & sicurezza fino al rogito",
    s4: "Coordinamento locale (notai, traduzioni, pratiche)",
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

// === Modales : ouverture / fermeture ===
function openModal(id) {
  const m = document.getElementById(id);
  if (!m) return;
  m.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  const dlg = m.querySelector('.modal-dialog');
  if (dlg) dlg.focus();
}
function closeModal(m) {
  if (!m) return;
  m.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.addEventListener('click', (e) => {
  // clic sur une carte
  const btn = e.target.closest('.link-card');
  if (btn && btn.dataset.modal) {
    e.preventDefault();
    openModal(btn.dataset.modal);
  }
  // clic sur fermer / backdrop
  if (e.target.matches('[data-close]')) {
    closeModal(e.target.closest('.modal'));
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal[aria-hidden="false"]')
      .forEach((m) => closeModal(m));
  }
});
// Défilement fluide vers les ancres (#)
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href').slice(1);
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
// Affiche la bonne boîte (Top/Bottom) et masque le bouton déclencheur
function revealEmail(place) {
  const box = document.getElementById('emailBox' + place);
  const btn = document.getElementById('showEmail' + place);
  if (box && btn) {
    box.style.display = 'block';
    btn.style.display = 'none';
  }
}

// Copie l'adresse réelle dans le presse-papiers
function copyEmail() {
  const email = 'MediterraneaPropertyConsulting@proton.me';
  navigator.clipboard.writeText(email)
    .then(() => alert('Adresse copiée : ' + email))
    .catch(() => alert('Copie impossible, note l’adresse : ' + email));
}
// Affiche un petit bloc e-mail contextuel (suffix = 'tem', etc.)
function showEmailBox(suffix) {
  const link = document.getElementById('emailLink-' + suffix);
  const box  = document.getElementById('emailBox-' + suffix);
  if (link) link.style.display = 'none';
  if (box)  box.style.display  = 'block';
}

// Copie l'adresse depuis un span spécifique (par défaut conserve l'ancienne API)
function copyEmail(spanId = 'emailText') {
  const el = document.getElementById(spanId);
  if (!el) return;
  const txt = el.innerText.replace('[a]', '@');
  navigator.clipboard.writeText(txt)
    .then(() => {
      // petit feedback discret
      el.closest('.email-box')?.classList.add('copied');
      setTimeout(() => el.closest('.email-box')?.classList.remove('copied'), 1200);
    })
    .catch(() => alert('Impossible de copier. Copiez manuellement : ' + txt));
}
