import { theme } from '../config/colors.js'

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 transition'

const variants = {
  primary: [
    theme.button.primary.base,
    theme.button.primary.hover,
    theme.button.primary.ring,
  ].join(' '),
  secondary: [
    theme.button.secondary.base,
    theme.button.secondary.hover,
    theme.button.secondary.ring,
  ].join(' '),
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

