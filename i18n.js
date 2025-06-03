const translations = {
  pt: {
    title: "Conversor de Moedas",
    convert: "Converter",
  },
  en: {
    title: "Currency Converter",
    convert: "Convert",
  },
};

let currentLanguage = 'pt';

function setLanguage(lang) {
  currentLanguage = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = translations[lang][key];
  });
}
