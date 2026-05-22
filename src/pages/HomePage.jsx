import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGeolocation } from '../hooks/useGeolocation'
import { useEventsStore } from '../store/eventsStore'
import { useAuthStore } from '../store/authStore'
import { SPORTS } from '../lib/sports'
import SportMap from '../components/map/SportMap'
import EventCard from '../components/events/EventCard'

export default function HomePage() {
  const { location } = useGeolocation()
  const { events, radius, setRadius, fetchEvents, activeFilters, toggleFilter } = useEventsStore()
  const { user, signOut, init } = useAuthStore()

  useEffect(() => { init() }, [])
  useEffect(() => { if (location) fetchEvents() }, [location, radius])

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Topbar */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 z-10">
        <span className="font-medium text-blue-500 text-lg">SportRadar</span>
        <div className="flex-1" />
        <span className="text-xs text-gray-400 hidden sm:block">Radio:</span>
        <span className="text-xs font-medium text-gray-700 w-10">{radius}km</span>
        <input type="range" min="1" max="20" value={radius} step="1"
          onChange={e => setRadius(Number(e.target.value))}
          className="w-24" />
        {user
          ? <>
              <Link to="/crear-evento"
                className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 hover:border-gray-500 transition-colors">
                + Evento
              </Link>
              <button onClick={signOut} className="text-sm text-gray-400 hover:text-gray-700">Salir</button>
            </>
          : <Link to="/login"
              className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 hover:border-gray-500 transition-colors">
              Entrar
            </Link>
        }
      </header>

      {/* Filtros */}
      <div className="bg-white border-b border-gray-100 px-3 py-2 flex gap-2 overflow-x-auto z-10">
        {SPORTS.map(s => (
          <button key={s.id} onClick={() => { toggleFilter(s.id); fetchEvents() }}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-colors flex-shrink-0"
            style={activeFilters.includes(s.id)
              ? { background: s.color, borderColor: s.color, color: 'white' }
              : { borderColor: '#e5e7eb', color: '#4b5563', background: 'white' }
            }>
            {s.emoji} {s.label}
          </button>
        ))}
      </div>

      {/* Mapa */}
      <div className="flex-1 relative z-0 min-h-0">
        <SportMap userLocation={location} />
      </div>

      {/* Cards de eventos */}
      {events.length > 0 && (
        <div className="bg-white border-t border-gray-200 px-3 py-2.5 flex gap-2.5 overflow-x-auto z-10">
          {events.map(e => <EventCard key={e.id} event={e} />)}
        </div>
      )}

      {events.length === 0 && location && (
        <div className="bg-white border-t border-gray-100 px-4 py-3 text-center text-sm text-gray-400 z-10">
          No hay eventos en {radius}km · ¡
          {user
            ? <Link to="/crear-evento" className="text-blue-500 hover:underline">Crea el primero</Link>
            : <Link to="/login" className="text-blue-500 hover:underline">Inicia sesión para crear</Link>
          }!
        </div>
      )}
    </div>
  )
}
