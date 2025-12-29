import { useTranslation } from 'react-i18next'
import Button from '../components/Button.jsx'

function ItemsPage() {
  const { t } = useTranslation()

  return (
    <div className="space-y-4">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-widest text-amber-400">
          {t('items.title')}
        </p>
        <h1 className="text-3xl font-bold text-slate-50 sm:text-4xl">
          {t('items.subtitle')}
        </h1>
        <p className="text-slate-300 leading-relaxed">{t('items.helper')}</p>
      </header>

      <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 p-6 text-slate-200 shadow-inner">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-1">
            <p className="text-lg font-semibold">{t('items.action')}</p>
            <p className="text-sm text-slate-400">{t('items.draft')}</p>
          </div>
          <Button>{t('items.action')}</Button>
        </div>
      </div>
    </div>
  )
}

export default ItemsPage

