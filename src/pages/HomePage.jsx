import { useTranslation } from 'react-i18next'

function HomePage() {
  const { t } = useTranslation()

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

  return (
    <div className="space-y-6">
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
    </div>
  )
}

export default HomePage

