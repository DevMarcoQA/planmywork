const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 transition'

const variants = {
  primary: 'bg-sky-600 text-white hover:bg-sky-500 focus:ring-sky-400',
  secondary: 'border border-slate-700 text-slate-100 hover:bg-slate-800/70 focus:ring-slate-500',
}

const sizes = {
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
}

function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  const classes = [
    baseClasses,
    variants[variant] ?? variants.primary,
    sizes[size] ?? sizes.md,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

export default Button

