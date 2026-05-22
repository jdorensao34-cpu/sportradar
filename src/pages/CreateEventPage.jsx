import { Link } from 'react-router-dom'
import EventForm from '../components/events/EventForm'

export default function CreateEventPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto mb-4">
        <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">← Volver al mapa</Link>
      </div>
      <EventForm />
    </div>
  )
}
