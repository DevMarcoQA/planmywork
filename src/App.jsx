import { useTranslation } from 'react-i18next'
import './App.css'

function App() {
  const { t, i18n } = useTranslation()
  const currentLang = i18n.resolvedLanguage || i18n.language

  const links = [
    {
      key: 'tailwind',
      href: 'https://tailwindcss.com/docs',
      classes:
        'border-sky-800/70 bg-sky-900/30 hover:border-sky-400 hover:shadow-sky-900/40',
      arrowClass: 'text-sky-300',
    },
    {
      key: 'react',
      href: 'https://react.dev/learn',
      classes: 'border-slate-800 bg-slate-900/40 hover:border-slate-600',
      arrowClass: 'text-slate-400',
    },
    {
      key: 'vite',
      href: 'https://vite.dev/guide/',
      classes: 'border-slate-800 bg-slate-900/40 hover:border-slate-600',
      arrowClass: 'text-slate-400',
    },
  ]

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value)
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <section className="w-full max-w-4xl rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur shadow-xl shadow-sky-900/20 p-10 space-y-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-widest text-sky-400">
              {t('hero.kicker')}
            </p>
            <h1 className="text-3xl font-bold text-slate-50 sm:text-4xl">
              {t('hero.title')}
            </h1>
            <p className="text-slate-300 leading-relaxed">
              {t('hero.description', { path: t('hero.path') })}
            </p>
          </div>
          <div className="flex items-center gap-2 self-end">
            <label
              className="text-xs font-medium uppercase tracking-wide text-slate-400"
              htmlFor="lang-select"
            >
              {t('language.label')}
            </label>
            <select
              id="lang-select"
              value={currentLang}
              onChange={handleLanguageChange}
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 shadow-inner focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="es">{t('language.es')}</option>
              <option value="en">{t('language.en')}</option>
            </select>
          </div>
        </header>

        <div className="grid gap-4 sm:grid-cols-3">
          {links.map((link) => (
            <a
              key={link.key}
              className={`flex items-center justify-between rounded-xl border px-4 py-3 text-slate-100 shadow-inner transition hover:-translate-y-0.5 ${link.classes}`}
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-100">
                  {t(`links.${link.key}.title`)}
                </p>
                <p className="text-xs text-slate-300">
                  {t(`links.${link.key}.description`)}
                </p>
              </div>
              <span className={link.arrowClass}>→</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
