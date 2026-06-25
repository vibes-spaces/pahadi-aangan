import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const [rooms, bookings, guests] = await Promise.all([
    supabase().from('rooms').select('*'),
    supabase().from('bookings').select('*'),
    supabase().from('guests').select('*'),
  ])
  return NextResponse.json({
    rooms: rooms.data || [],
    bookings: bookings.data || [],
    guests: guests.data || [],
  })
}
