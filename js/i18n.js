const DEFAULT_LOCALE = 'en-US';
const LOCALE_STORAGE_KEY = '2048_locale';
const LOCALES = Object.create(null);

let currentLocale = DEFAULT_LOCALE;

function registerLocale(code, pack) {
    LOCALES[code] = pack;
}

function t(key) {
    const active = LOCALES[currentLocale].messages[key];
    if (typeof active === 'string') return active;
    const fallback = LOCALES[DEFAULT_LOCALE].messages[key];
    return typeof fallback === 'string' ? fallback : key;
}

function loadSavedLocale() {
    try {
        const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
        return LOCALES[saved] ? saved : DEFAULT_LOCALE;
    } catch (error) {
        return DEFAULT_LOCALE;
    }
}

function persistLocale(code) {
    try {
        localStorage.setItem(LOCALE_STORAGE_KEY, code);
    } catch (error) {
        return;
    }
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
        el.setAttribute('aria-label', t(el.dataset.i18nAriaLabel));
    });
}

function setLocale(code) {
    currentLocale = LOCALES[code] ? code : DEFAULT_LOCALE;
    document.documentElement.lang = currentLocale;
    applyTranslations();
    document.getElementById('langSelect').value = currentLocale;
    document.dispatchEvent(new CustomEvent('localechange'));
}

function initI18n() {
    const select = document.getElementById('langSelect');
    for (const code of Object.keys(LOCALES)) {
        const option = document.createElement('option');
        option.value = code;
        option.lang = code;
        option.textContent = LOCALES[code].name;
        select.appendChild(option);
    }
    select.addEventListener('change', () => {
        setLocale(select.value);
        persistLocale(currentLocale);
        select.blur();
    });
    setLocale(loadSavedLocale());
}
