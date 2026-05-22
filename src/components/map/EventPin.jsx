import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { getSport } from '../../lib/sports'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

function createPinIcon(color) {
  return L.divIcon({
    className: '',
    html: `<div style="width:14px;height:14px;border-radius:50%;background:${color};border:2.5px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.25);"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  })
}

export default function EventPin({ event }) {
  const sport = getSport(event.sport)
  return (
    <Marker position={[event.lat, event.lng]} icon={createPinIcon(sport.color)}>
      <Popup>
        <div style={{ minWidth: 160, fontFamily: 'sans-serif' }}>
          <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 4 }}>
            {sport.emoji} {event.title}
          </div>
          <div style={{ fontSize: 12, color: '#666', marginBottom: 2 }}>{event.location_name}</div>
          <div style={{ fontSize: 12, color: '#666' }}>
            {format(new Date(event.starts_at), "eee d MMM · HH:mm", { locale: es })}
          </div>
          {event.spots_left != null && (
            <div style={{ fontSize: 12, marginTop: 4, color: sport.color, fontWeight: 500 }}>
              {event.spots_left} lugares disponibles
            </div>
          )}
        </div>
      </Popup>
    </Marker>
  )
}
