import { useEffect } from 'react'
import { MapContainer, TileLayer, Circle, useMap } from 'react-leaflet'
import { useEventsStore } from '../../store/eventsStore'
import EventPin from './EventPin'

function RecenterMap({ center }) {
  const map = useMap()
  useEffect(() => {
    if (center) map.setView([center.lat, center.lng], 14)
  }, [center])
  return null
}

export default function SportMap({ userLocation }) {
  const { events, radius, fetchEvents, setCenter } = useEventsStore()

  useEffect(() => {
    if (userLocation) {
      setCenter(userLocation)
      fetchEvents()
    }
  }, [userLocation, radius])

  const center = userLocation ?? { lat: -33.4489, lng: -70.6693 }

  return (
    <MapContainer center={[center.lat, center.lng]} zoom={14} className="w-full h-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RecenterMap center={userLocation} />
      {userLocation && (
        <Circle
          center={[userLocation.lat, userLocation.lng]}
          radius={radius * 1000}
          pathOptions={{
            color: '#378ADD', fillColor: '#378ADD',
            fillOpacity: 0.05, weight: 1.5, dashArray: '6 4'
          }}
        />
      )}
      {events.map(event => <EventPin key={event.id} event={event} />)}
    </MapContainer>
  )
}
