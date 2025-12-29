import Button from './Button.jsx'
import { theme } from '../config/colors.js'

function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
  loading = false,
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className={`relative w-full max-w-md rounded-xl border ${theme.panel.border} ${theme.panel.background} p-5 shadow-xl`}
      >
        <div className="space-y-3">
          <h2 className={`text-lg font-semibold ${theme.text.primary}`}>
            {title}
          </h2>
          <p className={`${theme.text.secondary} text-sm`}>{message}</p>
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={onCancel}
            disabled={loading}
            type="button"
          >
            {cancelLabel}
          </Button>
          <Button onClick={onConfirm} disabled={loading} type="button">
            {loading ? 'Eliminando...' : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog

