import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../components/Button.jsx'
import ItemForm from '../components/ItemForm.jsx'
import { supabase } from '../lib/supabaseClient.js'

function ItemsPage() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [userId, setUserId] = useState(null)
  const [session, setSession] = useState(null)

  const ensureSessionAndUser = async () => {
    let currentSession = session

    if (!currentSession) {
      const { data, error } = await supabase.auth.getSession()
      if (error || !data.session) {
        throw new Error('No hay sesión activa')
      }
      currentSession = data.session
      setSession(currentSession)
    }

    if (userId) return userId

    const authId = currentSession.user.id
    const { data: userRow, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('auth_id', authId)
      .maybeSingle()

    if (userError) throw userError
    if (!userRow) throw new Error('No se encontró el usuario en la tabla users')

    setUserId(userRow.id)
    return userRow.id
  }

  const handleSubmit = (formValues) => {
    const createItem = async () => {
      try {
        setSubmitting(true)
        const uid = await ensureSessionAndUser()

        const payload = {
          user_id: uid,
          name: formValues.name,
          avatar_color: formValues.avatarColor,
          daily_capacity: Number(formValues.capacity),
          days: Number(formValues.days),
          description: formValues.description || null,
        }

        const { error } = await supabase
          .schema('api')
          .from('workitems')
          .insert([payload])

        if (error) throw error

        setOpen(false)
      } catch (err) {
        console.error('No se pudo crear el ítem', err)
        alert(t('auth.loginError', { message: err.message }))
      } finally {
        setSubmitting(false)
      }
    }

    createItem()
  }

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
          {!open && (
            <Button onClick={() => setOpen(true)}>{t('items.action')}</Button>
          )}
        </div>

        {open && (
          <ItemForm
            onSubmit={handleSubmit}
            onCancel={() => setOpen(false)}
            submitting={submitting}
          />
        )}
      </div>
    </div>
  )
}

export default ItemsPage

