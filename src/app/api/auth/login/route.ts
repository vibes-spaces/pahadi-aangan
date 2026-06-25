import { NextRequest, NextResponse } from 'next/server'

const ADMIN_USER = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'admin123'

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()
  if (username !== ADMIN_USER || password !== ADMIN_PASS) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }
  const token = Buffer.from(`${username}:${Date.now()}`).toString('base64')
  const res = NextResponse.json({ success: true, token })
  res.cookies.set('admin_auth', token, {
    path: '/', maxAge: 86400, sameSite: 'lax', httpOnly: true, secure: process.env.NODE_ENV === 'production',
  })
  return res
}
