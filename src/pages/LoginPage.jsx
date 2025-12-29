import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useTranslation } from 'react-i18next'

function LoginPage({ session }) {
  const { t } = useTranslation()

  if (session) return <Navigate to="/" replace />

  const handleGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/` },
    })

    if (error) alert(t('auth.loginError', { message: error.message }))
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <section className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur shadow-xl shadow-sky-900/30 p-8 space-y-6">
        <div className="space-y-2 text-center">
          <p className="text-xs uppercase tracking-widest text-sky-400">
            {t('brand')}
          </p>
          <h1 className="text-2xl font-bold text-slate-50">
            {t('auth.loginTitle')}
          </h1>
          <p className="text-sm text-slate-300">{t('auth.loginSubtitle')}</p>
        </div>

        <button
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-white text-slate-900 px-4 py-2.5 font-semibold shadow hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          <span className="text-lg">🔒</span>
          <span>{t('auth.google')}</span>
        </button>

        <p className="text-xs text-center text-slate-400 leading-relaxed">
          {t('auth.loginHelp')}
        </p>
      </section>
    </main>
  )
}

export default LoginPage

