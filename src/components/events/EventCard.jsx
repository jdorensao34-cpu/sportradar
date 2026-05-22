import { getSport } from '../../lib/sports'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default function EventCard({ event, onClick }) {
  const sport = getSport(event.sport)
  const distKm = event.distance_m ? (event.distance_m / 1000).toFixed(1) : null

  return (
    <div
      onClick={() => onClick?.(event)}
      className="min-w-[150px] border border-gray-200 rounded-lg p-3 cursor-pointer hover:border-gray-400 transition-colors bg-white flex-shrink-0"
    >
      <div className="flex items-center gap-1.5 mb-1">
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: sport.color, display: 'inline-block' }} />
        <span className="text-xs text-gray-500">{sport.label}</span>
      </div>
      <div className="text-sm font-medium text-gray-900 leading-tight">{event.title}</div>
      <div className="text-xs text-gray-500 mt-1">
        {format(new Date(event.starts_at), "eee HH:mm", { locale: es })}
        {distKm && ` · ${distKm}km`}
      </div>
    </div>
  )
}
