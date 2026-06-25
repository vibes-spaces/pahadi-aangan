import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const authCookie = req.cookies.get('admin_auth')
  const authenticated = !!(authCookie && authCookie.value)
  return NextResponse.json({ authenticated })
}
