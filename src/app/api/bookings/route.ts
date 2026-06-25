import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabase.from('bookings').select('*').order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { data, error } = await supabase.from('bookings').insert({
    guest_name: body.guestName,
    guest_email: body.guestEmail,
    guest_phone: body.guestPhone,
    room_type: body.roomType,
    room_title: body.roomTitle,
    check_in: body.checkIn,
    check_out: body.checkOut,
    guests: body.guests,
    status: 'pending',
    total_amount: body.totalAmount,
    payment_status: body.paymentStatus || 'pending',
    special_requests: body.specialRequests,
  }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
