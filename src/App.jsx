import { useCallback, useEffect, useState } from 'react'
import { NavLink, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import HomePage from './pages/HomePage.jsx'
import ItemsPage from './pages/ItemsPage.jsx'
import CalendarPage from './pages/CalendarPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { supabase } from './lib/supabaseClient.js'
import Select from './components/Select.jsx'
import { theme } from './config/colors.js'
import './App.css'

function AppShell({
  navItems,
  navLinkClasses,
  handleLanguageChange,
  currentLang,
  onSignOut,
  userEmail,
  t,
}) {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <section
        className={`w-full max-w-5xl rounded-2xl border ${theme.panel.border} ${theme.panel.background} backdrop-blur shadow-xl shadow-sky-900/20 p-6 sm:p-10 space-y-6`}
      >
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#d4a373]/20 border border-[#d4a373]/50 flex items-center justify-center text-[#8a6b4a] font-bold">
              PM
            </div>
            <div>
              <p className={`text-xs uppercase tracking-widest ${theme.text.muted}`}>
                {t('brand')}
              </p>
              <p className={`text-lg font-semibold ${theme.text.primary}`}>
                PlanMyWork
              </p>
              {userEmail ? (
                <p className={`text-xs ${theme.text.muted}`}>
                  {t('auth.loggedAs', { email: userEmail })}
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <nav className="flex flex-wrap gap-2">
              {navItems.map((item) => (
                <NavLink key={item.to} to={item.to} className={navLinkClasses}>
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <label
                className="text-xs font-medium uppercase tracking-wide text-slate-400"
                htmlFor="lang-select"
              >
                {t('language.label')}
              </label>
              <Select
                id="lang-select"
                value={currentLang}
                onChange={handleLanguageChange}
                options={[
                  { value: 'es', label: t('language.es') },
                  { value: 'en', label: t('language.en') },
                ]}
                className="min-w-[120px]"
              />
            </div>
            <button
              onClick={onSignOut}
              className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-800/70 focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              {t('auth.logout')}
            </button>
          </div>
        </header>

        <div
          className={`rounded-xl border ${theme.panel.border} ${theme.panel.background} p-6 shadow-inner`}
        >
          <Outlet />
        </div>
      </section>
    </main>
  )
}

function App() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const [session, setSession] = useState(null)
  const [loadingSession, setLoadingSession] = useState(true)
  const [ensuringUser, setEnsuringUser] = useState(false)

  const currentLang = i18n.resolvedLanguage || i18n.language

  const navItems = [
    { to: '/', label: t('nav.home') },
    { to: '/items', label: t('nav.items') },
    { to: '/calendar', label: t('nav.calendar') },
  ]

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value)
  }

  const navLinkClasses = ({ isActive }) =>
    [
      'px-4 py-2 rounded-lg text-sm font-semibold transition',
      'border border-transparent',
      isActive
        ? 'bg-sky-600 text-white shadow'
        : 'text-slate-200 hover:bg-slate-800/60 hover:border-slate-700',
    ].join(' ')

  useEffect(() => {
    let active = true

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!active) return
        setSession(data.session)
        setLoadingSession(false)
      })
      .catch(() => setLoadingSession(false))

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession)
        if (!newSession) navigate('/login')
      },
    )

    return () => {
      active = false
      subscription?.subscription?.unsubscribe()
    }
  }, [navigate])

  const ensureUserRow = useCallback(
    async (currentSession) => {
      if (!currentSession || ensuringUser) return
      setEnsuringUser(true)

      const authId = currentSession.user.id
      const email = currentSession.user.email
      const fullName = currentSession.user.user_metadata?.full_name ?? null
      const avatarUrl = currentSession.user.user_metadata?.avatar_url ?? null

      try {
        const { data, error } = await supabase
          .from('users')
          .select('id')
          .eq('auth_id', authId)
          .maybeSingle()

        if (error) throw error

        if (!data) {
          const { error: insertError } = await supabase.from('users').insert([
            {
              auth_id: authId,
              email,
              full_name: fullName,
              avatar_url: avatarUrl,
            },
          ])

          if (insertError) throw insertError
        }
      } catch (err) {
        console.error('No se pudo asegurar el usuario', err)
        alert(t('auth.loginError', { message: err.message }))
      } finally {
        setEnsuringUser(false)
      }
    },
    [ensuringUser, t],
  )

  useEffect(() => {
    if (session) ensureUserRow(session)
  }, [ensureUserRow, session])

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) alert(t('auth.logoutError', { message: error.message }))
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage session={session} />} />
      <Route
        element={<ProtectedRoute session={session} loading={loadingSession} />}
      >
        <Route
          element={
            <AppShell
              navItems={navItems}
              navLinkClasses={navLinkClasses}
              handleLanguageChange={handleLanguageChange}
              currentLang={currentLang}
              onSignOut={handleSignOut}
              userEmail={session?.user?.email}
              t={t}
            />
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/items" element={<ItemsPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
