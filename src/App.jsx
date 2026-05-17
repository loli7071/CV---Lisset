import { motion } from 'framer-motion';
import { Mail, MapPin, Moon, Phone, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CVDocument from './components/CVDocument.jsx';
import DownloadButton from './components/DownloadButton.jsx';
import LanguageSelector from './components/LanguageSelector.jsx';
import { useDarkMode } from './hooks/useDarkMode.js';

export default function App() {
  const { t } = useTranslation();
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <div className="min-h-screen bg-[var(--page)] text-[var(--ink)] transition-colors duration-300">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/95 shadow-lg backdrop-blur">
        <div className="mx-auto flex w-[min(100%-32px,1180px)] flex-wrap items-center justify-between gap-3 py-3">
          <a className="text-xs font-bold uppercase tracking-[0.14em] text-white" href="#top">
            {t('profile.name')}
          </a>
          <nav className="hidden flex-wrap gap-4 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-white/75 md:flex">
            {t('nav', { returnObjects: true }).map((item) => (
              <a className="transition hover:text-white" href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <LanguageSelector compact />
            <button className="icon-button" onClick={toggleDarkMode} type="button" aria-label={t('actions.toggleTheme')}>
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <DownloadButton targetId="cv-document" />
          </div>
        </div>
        <div className="h-1 bg-[linear-gradient(90deg,var(--red)_0_30%,#f7f7f7_30%_36%,var(--blue)_36%_70%,var(--gold)_70%_100%)]" />
      </header>

      <aside className="fixed left-4 top-28 z-20 hidden w-12 flex-col items-center gap-3 rounded-full border border-[var(--line)] bg-[var(--panel)] p-2 shadow-xl xl:flex">
        <a className="side-dot" href={`mailto:${t('contact.email')}`} aria-label="Email">
          <Mail size={17} />
        </a>
        <a className="side-dot" href={`https://wa.me/${t('contact.whatsappLink')}`} aria-label="WhatsApp">
          <Phone size={17} />
        </a>
        <a className="side-dot" href="#contact" aria-label={t('sections.contact')}>
          <MapPin size={17} />
        </a>
      </aside>

      <main id="top" className="mx-auto w-[min(100%-32px,1180px)] py-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <LanguageSelector />
            <button className="theme-button" onClick={toggleDarkMode} type="button">
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
              {isDark ? t('actions.light') : t('actions.dark')}
            </button>
          </div>
          <CVDocument />
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[var(--line)] bg-[var(--panel)] p-4 shadow-lg">
            <LanguageSelector />
            <DownloadButton targetId="cv-document" />
          </div>
        </motion.div>
      </main>
    </div>
  );
}
