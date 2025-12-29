import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../components/Button.jsx'
import ItemForm from '../components/ItemForm.jsx'
import ConfirmDialog from '../components/ConfirmDialog.jsx'
import { supabase } from '../lib/supabaseClient.js'
import { avatarColorMap, theme } from '../config/colors.js'

function ItemsPage() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [userId, setUserId] = useState(null)
  const [session, setSession] = useState(null)
  const [items, setItems] = useState([])
  const [loadingItems, setLoadingItems] = useState(true)
  const [editingItem, setEditingItem] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [confirmItem, setConfirmItem] = useState(null)

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

  const loadItems = async () => {
    try {
      setLoadingItems(true)
      const uid = await ensureSessionAndUser()
      const { data, error } = await supabase
        .schema('api')
        .from('workitems')
        .select('id, name, avatar_color, daily_capacity, days, description, created_at')
        .eq('user_id', uid)
        .order('created_at', { ascending: false })

      if (error) throw error
      setItems(data || [])
    } catch (err) {
      console.error('No se pudieron cargar los ítems', err)
      alert(t('auth.loginError', { message: err.message }))
    } finally {
      setLoadingItems(false)
    }
  }

  useEffect(() => {
    loadItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = (formValues) => {
    const saveItem = async () => {
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

        if (editingItem) {
          const { error } = await supabase
            .schema('api')
            .from('workitems')
            .update(payload)
            .eq('id', editingItem.id)
            .eq('user_id', uid)
            .select('id') // fuerza la petición y devuelve el id actualizado

          if (error) throw error
        } else {
          const { error } = await supabase
            .schema('api')
            .from('workitems')
            .insert([payload])
            .select('id') // fuerza la petición y devuelve el id creado

          if (error) throw error
        }

        setOpen(false)
        setEditingItem(null)
        loadItems()
      } catch (err) {
        console.error('No se pudo crear el ítem', err)
        alert(t('auth.loginError', { message: err.message }))
      } finally {
        setSubmitting(false)
      }
    }

    saveItem()
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setOpen(true)
  }

  const handleDelete = async () => {
    if (!confirmItem) return
    const id = confirmItem.id
    try {
      setDeletingId(id)
      const uid = await ensureSessionAndUser()
      const { error } = await supabase
        .schema('api')
        .from('workitems')
        .delete()
        .eq('id', id)
        .eq('user_id', uid)
        .select('id') // fuerza la petición y devuelve el id borrado

      if (error) throw error
      loadItems()
    } catch (err) {
      console.error('No se pudo eliminar el ítem', err)
      alert(t('auth.loginError', { message: err.message }))
    } finally {
      setDeletingId(null)
      setConfirmItem(null)
    }
  }

  const hasItems = items.length > 0

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

      {!hasItems ? (
        <div
          className={`rounded-2xl border border-dashed ${theme.panelAlt.border} ${theme.panelAlt.background} p-6 text-slate-200 shadow-inner`}
        >
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
              onCancel={() => {
                setOpen(false)
                setEditingItem(null)
              }}
              submitting={submitting}
              initialValues={
                editingItem
                  ? {
                      name: editingItem.name,
                      avatarColor: editingItem.avatar_color,
                      capacity: editingItem.daily_capacity,
                      days: editingItem.days,
                      description: editingItem.description || '',
                    }
                  : undefined
              }
              submitLabel={editingItem ? 'Guardar cambios' : undefined}
            />
          )}
        </div>
      ) : (
        <div
          className={`rounded-2xl border ${theme.panel.border} ${theme.panel.background} p-6 text-slate-200 shadow-inner space-y-4`}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
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
              onCancel={() => {
                setOpen(false)
                setEditingItem(null)
              }}
              submitting={submitting}
              initialValues={
                editingItem
                  ? {
                      name: editingItem.name,
                      avatarColor: editingItem.avatar_color,
                      capacity: editingItem.daily_capacity,
                      days: editingItem.days,
                      description: editingItem.description || '',
                    }
                  : undefined
              }
              submitLabel={editingItem ? 'Guardar cambios' : undefined}
            />
          )}

          {loadingItems ? (
            <div className="text-sm text-slate-400">Cargando ítems...</div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <div
                  key={item.id}
                    className={`rounded-xl border ${theme.panel.border} ${theme.panelAlt.background} p-4 shadow-inner flex flex-col gap-3`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`h-10 w-10 rounded-full border border-slate-700 ${
                        avatarColorMap[item.avatar_color] || 'bg-slate-500'
                      }`}
                    />
                    <div>
                      <p className="text-base font-semibold text-slate-100">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        Capacidad diaria: {item.daily_capacity} • Días:{' '}
                        {item.days}
                      </p>
                    </div>
                  </div>
                  {item.description ? (
                    <p className="text-sm text-slate-300">{item.description}</p>
                  ) : null}
                  <div className="flex gap-2">
                    <Button variant="secondary" onClick={() => handleEdit(item)}>
                      ✏️
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setConfirmItem(item)}
                      disabled={deletingId === item.id}
                    >
                      {deletingId === item.id ? '⏳' : '🗑️'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <ConfirmDialog
        open={!!confirmItem}
        title="Eliminar ítem"
        message={
          confirmItem
            ? `¿Seguro que quieres eliminar "${confirmItem.name}"?`
            : ''
        }
        onConfirm={handleDelete}
        onCancel={() => {
          setConfirmItem(null)
          setDeletingId(null)
        }}
        loading={!!deletingId}
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
      />
    </div>
  )
}

export default ItemsPage

