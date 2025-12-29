import { useMemo, useState } from 'react'

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
        'w-full text-left px-3 py-2 rounded-lg border border-transparent transition',
        isSelected
          ? 'bg-sky-600/20 border-sky-500 text-slate-50'
          : 'hover:bg-slate-800 text-slate-100',
      ].join(' ')}
    >
      <div className="flex items-center gap-2">
        {option.colorDot ? (
          <span
            className={`h-3 w-3 rounded-full border border-slate-700 ${option.colorDot}`}
          />
        ) : null}
        <span className="text-sm font-medium">{option.label}</span>
      </div>
      {option.description ? (
        <p className="mt-1 text-xs text-slate-400">{option.description}</p>
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
          'w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 shadow-inner transition',
          'focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900',
          disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-800',
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
          <span className="text-slate-400">{open ? '▲' : '▼'}</span>
        </div>
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-full rounded-xl border border-slate-800 bg-slate-900/95 p-2 shadow-xl shadow-slate-900/40 backdrop-blur">
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

