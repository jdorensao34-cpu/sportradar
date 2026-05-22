export const SPORTS = [
  { id: 'futbol',     label: 'Fútbol',     emoji: '⚽', color: '#378ADD' },
  { id: 'running',    label: 'Running',    emoji: '🏃', color: '#1D9E75' },
  { id: 'basketball', label: 'Basketball', emoji: '🏀', color: '#D85A30' },
  { id: 'ciclismo',   label: 'Ciclismo',   emoji: '🚴', color: '#7F77DD' },
  { id: 'yoga',       label: 'Yoga',       emoji: '🧘', color: '#D4537E' },
  { id: 'tenis',      label: 'Tenis',      emoji: '🎾', color: '#BA7517' },
  { id: 'natacion',   label: 'Natación',   emoji: '🏊', color: '#185FA5' },
  { id: 'volleyball', label: 'Volleyball', emoji: '🏐', color: '#639922' },
  { id: 'otro',       label: 'Otro',       emoji: '🏅', color: '#888780' },
]

export function getSport(id) {
  return SPORTS.find(s => s.id === id) ?? SPORTS.at(-1)
}
