import './App.css'

function App() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <section className="w-full max-w-4xl rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur shadow-xl shadow-sky-900/20 p-10 space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-400">
            PlanMyWork
          </p>
          <h1 className="text-3xl font-bold text-slate-50 sm:text-4xl">
            Plantilla Vite + React + Tailwind lista para construir
          </h1>
          <p className="text-slate-300 leading-relaxed">
            Tailwind CSS ya está configurado. Empieza editando este componente en
            <span className="font-semibold text-slate-100"> src/App.jsx</span> y
            añade tus propias vistas.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <a
            className="flex items-center justify-between rounded-xl border border-sky-800/70 bg-sky-900/30 px-4 py-3 text-slate-100 shadow-inner transition hover:-translate-y-0.5 hover:border-sky-400 hover:shadow-sky-900/40"
            href="https://tailwindcss.com/docs"
            target="_blank"
            rel="noreferrer"
          >
            <div className="space-y-1">
              <p className="text-sm font-semibold text-sky-200">Tailwind</p>
              <p className="text-xs text-slate-300">Utilidades y ejemplos</p>
            </div>
            <span className="text-sky-300">→</span>
          </a>
          <a
            className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3 text-slate-100 transition hover:-translate-y-0.5 hover:border-slate-600"
            href="https://react.dev/learn"
            target="_blank"
            rel="noreferrer"
          >
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-100">React</p>
              <p className="text-xs text-slate-300">Guía oficial</p>
            </div>
            <span className="text-slate-400">→</span>
          </a>
          <a
            className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3 text-slate-100 transition hover:-translate-y-0.5 hover:border-slate-600"
            href="https://vite.dev/guide/"
            target="_blank"
            rel="noreferrer"
          >
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-100">Vite</p>
              <p className="text-xs text-slate-300">Herramientas y plugins</p>
            </div>
            <span className="text-slate-400">→</span>
          </a>
        </div>
      </section>
    </main>
  )
}

export default App
