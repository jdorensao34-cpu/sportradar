import { create } from 'zustand'
import { supabase } from '../lib/supabase'

export const useEventsStore = create((set, get) => ({
  events: [],
  loading: false,
  radius: 5,
  center: null,
  activeFilters: [],

  setRadius: (r) => set({ radius: r }),
  setCenter: (c) => set({ center: c }),

  toggleFilter: (sportId) => {
    const { activeFilters } = get()
    set({
      activeFilters: activeFilters.includes(sportId)
        ? activeFilters.filter(f => f !== sportId)
        : [...activeFilters, sportId]
    })
  },

  fetchEvents: async () => {
    const { center, radius, activeFilters } = get()
    if (!center) return
    set({ loading: true })

    let query = supabase.rpc('events_within_radius', {
      lat: center.lat,
      lng: center.lng,
      radius_km: radius
    })

    if (activeFilters.length > 0) {
      query = query.in('sport', activeFilters)
    }

    const { data, error } = await query
    if (error) console.error('fetchEvents error:', error)
    else set({ events: data ?? [] })
    set({ loading: false })
  },

  createEvent: async (eventData) => {
    const { data, error } = await supabase
      .from('events')
      .insert([eventData])
      .select()
      .single()
    if (error) throw error
    return data
  }
}))
