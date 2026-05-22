import { useState } from 'react'
import { SPORTS } from '../../lib/sports'
import { useEventsStore } from '../../store/eventsStore'
import { useNavigate } from 'react-router-dom'

const INITIAL = { title: '', sport: 'futbol', location_name: '', lat: '', lng: '', starts_at: '', spots: '' }

export default function EventForm() {
  const [form, setForm] = useState(INITIAL)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { createEvent } = useEventsStore()
  const navigate = useNavigate()

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await createEvent({
        title: form.title,
        sport: form.sport,
        location_name: form.location_name,
        lat: parseFloat(form.lat),
        lng: parseFloat(form.lng),
        starts_at: form.starts_at,
        spots: form.spots ? parseInt(form.spots) : null,
      })
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6 bg-white rounded-xl border border-gray-200">
      <h2 className="text-xl font-medium">Crear evento deportivo</h2>

      {error && <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded p-3">{error}</div>}

      <div>
        <label className="block text-sm text-gray-600 mb-1">Título</label>
        <input value={form.title} onChange={e => set('title', e.target.value)}
          placeholder="Ej: Fútbol 5 en el parque" required
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Disciplina</label>
        <select value={form.sport} onChange={e => set('sport', e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400">
          {SPORTS.map(s => <option key={s.id} value={s.id}>{s.emoji} {s.label}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Nombre del lugar</label>
        <input value={form.location_name} onChange={e => set('location_name', e.target.value)}
          placeholder="Ej: Parque O'Higgins, cancha norte" required
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Latitud</label>
          <input value={form.lat} onChange={e => set('lat', e.target.value)}
            placeholder="-33.4489" required type="number" step="any"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Longitud</label>
          <input value={form.lng} onChange={e => set('lng', e.target.value)}
            placeholder="-70.6693" required type="number" step="any"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
        </div>
      </div>
      <p className="text-xs text-gray-400 -mt-2">Tip: click derecho en Google Maps → "¿Qué hay aquí?" para ver coordenadas</p>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Fecha y hora de inicio</label>
        <input value={form.starts_at} onChange={e => set('starts_at', e.target.value)}
          type="datetime-local" required
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Cupos <span className="text-gray-400">(opcional)</span></label>
        <input value={form.spots} onChange={e => set('spots', e.target.value)}
          type="number" min="1" placeholder="Dejar vacío = sin límite"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
      </div>

      <button type="submit" disabled={loading}
        className="w-full bg-blue-500 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-blue-600 transition-colors disabled:opacity-60">
        {loading ? 'Publicando…' : 'Publicar evento'}
      </button>
    </form>
  )
}
