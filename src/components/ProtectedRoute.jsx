import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute({ session, loading }) {
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="text-slate-300 text-sm">Cargando sesión...</div>
      </main>
    )
  }

  if (!session) return <Navigate to="/login" replace />

  return <Outlet />
}

export default ProtectedRoute

