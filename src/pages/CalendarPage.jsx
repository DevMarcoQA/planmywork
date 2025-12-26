import { useTranslation } from 'react-i18next'

function CalendarPage() {
  const { t } = useTranslation()

  return (
    <div className="space-y-4">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
          {t('calendar.title')}
        </p>
        <h1 className="text-3xl font-bold text-slate-50 sm:text-4xl">
          {t('calendar.subtitle')}
        </h1>
        <p className="text-slate-300 leading-relaxed">{t('calendar.helper')}</p>
      </header>

      <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 p-6 text-slate-200 shadow-inner">
        <p className="text-sm text-slate-300">{t('calendar.empty')}</p>
      </div>
    </div>
  )
}

export default CalendarPage

