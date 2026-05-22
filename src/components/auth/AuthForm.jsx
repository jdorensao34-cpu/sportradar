import { useState } from 'react'
import { useAuthStore } from '../../store/authStore'
import { useNavigate } from 'react-router-dom'

export default function AuthForm() {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ email: '', password: '', name: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { signIn, signUp } = useAuthStore()
  const navigate = useNavigate()

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      if (mode === 'login') await signIn(form)
      else await signUp(form)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white border border-gray-200 rounded-xl">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-blue-500 text-xl font-medium">SportRadar</span>
      </div>
      <h1 className="text-lg font-medium mb-5">
        {mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
      </h1>

      {error && <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-3">
        {mode === 'signup' && (
          <input value={form.name} onChange={e => set('name', e.target.value)}
            placeholder="Tu nombre" required
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
        )}
        <input value={form.email} onChange={e => set('email', e.target.value)}
          type="email" placeholder="Email" required
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
        <input value={form.password} onChange={e => set('password', e.target.value)}
          type="password" placeholder="Contraseña" required
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
        <button type="submit" disabled={loading}
          className="w-full bg-blue-500 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-blue-600 disabled:opacity-60 transition-colors">
          {loading ? 'Cargando…' : mode === 'login' ? 'Entrar' : 'Registrarme'}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-4">
        {mode === 'login' ? '¿Sin cuenta? ' : '¿Ya tienes cuenta? '}
        <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
          className="text-blue-500 hover:underline">
          {mode === 'login' ? 'Regístrate' : 'Inicia sesión'}
        </button>
      </p>
    </div>
  )
}
