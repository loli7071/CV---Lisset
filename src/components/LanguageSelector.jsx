import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
  { code: 'pt', label: 'Português' },
];

export default function LanguageSelector({ compact = false }) {
  const { i18n } = useTranslation();

  return (
    <div className={`flex rounded-full border border-[var(--line)] bg-[var(--panel)] p-1 shadow-sm ${compact ? 'scale-90' : ''}`}>
      {languages.map((language) => (
        <button
          className={`rounded-full px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] transition ${
            i18n.language === language.code ? 'bg-[var(--green)] text-white' : 'text-[var(--muted)] hover:text-[var(--ink)]'
          }`}
          key={language.code}
          onClick={() => i18n.changeLanguage(language.code)}
          type="button"
        >
          {compact ? language.code : language.label}
        </button>
      ))}
    </div>
  );
}
