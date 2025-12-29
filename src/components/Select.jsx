import { useMemo, useState } from 'react'
import { theme } from '../config/colors.js'

function Option({ option, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(option.value)}
      onMouseDown={(e) => e.preventDefault()}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(option.value)
        }
      }}
      className={[
        'w-full text-left px-3 py-2 rounded-lg border transition',
        isSelected
          ? theme.form.optionSelected
          : `${theme.form.optionHover} border-transparent ${theme.text.primary}`,
      ].join(' ')}
    >
      <div className="flex items-center gap-2">
        {option.colorDot ? (
          <span
            className={`h-3 w-3 rounded-full border border-transparent ${option.colorDot}`}
          />
        ) : null}
        <span className="text-sm font-medium">{option.label}</span>
      </div>
      {option.description ? (
        <p className="mt-1 text-xs text-[#585858]">{option.description}</p>
      ) : null}
    </button>
  )
}

function Select({
  options = [],
  value,
  onChange,
  className = '',
  placeholder,
  disabled = false,
  name,
}) {
  const [open, setOpen] = useState(false)

  const selected = useMemo(
    () => options.find((o) => o.value === value),
    [options, value],
  )

  const handleSelect = (val) => {
    onChange?.({ target: { value: val, name } })
    setOpen(false)
  }

  return (
    <div
      className={['relative', className].filter(Boolean).join(' ')}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className={[
          'w-full rounded-lg border px-3 py-2 text-sm shadow-inner transition',
          theme.form.border,
          theme.form.background,
          theme.form.text,
          theme.form.placeholder,
          'focus:outline-none focus:ring-2',
          theme.form.focus,
          'focus:ring-offset-2 focus:ring-offset-[#f7f2e9]',
          disabled ? 'opacity-50 cursor-not-allowed' : '',
        ].join(' ')}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {selected?.colorDot ? (
              <span
                className={`h-3 w-3 rounded-full border border-slate-700 ${selected.colorDot}`}
              />
            ) : null}
            <span className="text-sm">
              {selected?.label || placeholder || 'Selecciona'}
            </span>
          </div>
          <span className="text-[#585858]">{open ? '▲' : '▼'}</span>
        </div>
      </button>

      {open && (
        <div
          className={`absolute z-20 mt-2 w-full rounded-xl border ${theme.form.dropdown} p-2 shadow-xl shadow-[#d4a373]/30 backdrop-blur`}
        >
          <div className="flex flex-col gap-1 max-h-64 overflow-auto">
            {options.map((opt) => (
              <Option
                key={opt.value}
                option={opt}
                isSelected={opt.value === value}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Select

