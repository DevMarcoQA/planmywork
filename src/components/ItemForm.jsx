import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from './Button.jsx'

const colors = [
  { value: 'sky', label: 'Sky', className: 'bg-sky-500' },
  { value: 'emerald', label: 'Emerald', className: 'bg-emerald-500' },
  { value: 'amber', label: 'Amber', className: 'bg-amber-500' },
  { value: 'violet', label: 'Violet', className: 'bg-violet-500' },
  { value: 'slate', label: 'Slate', className: 'bg-slate-500' },
]

const defaultValues = {
  name: '',
  avatarColor: 'sky',
  capacity: '',
  days: '',
  description: '',
}

function ItemForm({
  onSubmit,
  onCancel,
  initialValues = defaultValues,
  submitting = false,
}) {
  const { t } = useTranslation()
  const [form, setForm] = useState(initialValues)

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.capacity || !form.days) {
      alert('Completa los campos requeridos')
      return
    }
    onSubmit?.(form)
    setForm(defaultValues)
  }

  const selectedColor = colors.find((c) => c.value === form.avatarColor)

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-slate-200">
          <span>{t('items.form.name')}</span>
          <input
            required
            value={form.name}
            onChange={handleChange('name')}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="Ej. Proyecto A"
          />
        </label>

        <label className="space-y-2 text-sm font-medium text-slate-200">
          <span>{t('items.form.avatarColor')}</span>
          <div className="flex items-center gap-2">
            <select
              value={form.avatarColor}
              onChange={handleChange('avatarColor')}
              className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              {colors.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
            <span
              className={`h-9 w-9 rounded-full border border-slate-700 ${selectedColor?.className}`}
            />
          </div>
        </label>

        <label className="space-y-2 text-sm font-medium text-slate-200">
          <span>{t('items.form.capacity')}</span>
          <input
            required
            type="number"
            min="0"
            value={form.capacity}
            onChange={handleChange('capacity')}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="Ej. 5"
          />
        </label>

        <label className="space-y-2 text-sm font-medium text-slate-200">
          <span>{t('items.form.days')}</span>
          <input
            required
            type="number"
            min="0"
            value={form.days}
            onChange={handleChange('days')}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="Ej. 10"
          />
        </label>
      </div>

      <label className="space-y-2 text-sm font-medium text-slate-200 block">
        <span>{t('items.form.description')}</span>
        <textarea
          value={form.description}
          onChange={handleChange('description')}
          rows={3}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
          placeholder="Detalles, notas, etc."
        />
      </label>

      <div className="flex items-center gap-3 justify-end">
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            onCancel?.()
            setForm(initialValues)
          }}
        >
          {t('items.form.cancel')}
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? `${t('items.form.submit')}...` : t('items.form.submit')}
        </Button>
      </div>
    </form>
  )
}

export default ItemForm

