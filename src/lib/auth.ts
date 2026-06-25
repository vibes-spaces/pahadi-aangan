const ADMIN_USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin';
let ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

export function isAdmin(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('admin_auth') === 'true';
}

export async function loginAdmin(username: string, password: string): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  if (!username || !password) return false;
  // Server-side auth via API (sets httpOnly cookie)
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      localStorage.setItem('admin_auth', 'true');
      return true;
    }
    return false;
  } catch {
    // Fallback to client-side auth
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem('admin_auth', 'true');
      const isSecure = location.protocol === 'https:';
      document.cookie = `admin_auth=true; path=/; max-age=86400; SameSite=Lax${isSecure ? '; Secure' : ''}`;
      return true;
    }
    return false;
  }
}

export async function logout(): Promise<void> {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('admin_auth');
  document.cookie = 'admin_auth=; path=/; max-age=0; SameSite=Lax';
  try {
    await fetch('/api/auth/logout', { method: 'POST' });
  } catch {}
}

export function setAdminCredentials(password: string): void {
  if (password && password.length >= 4) ADMIN_PASSWORD = password;
}

export function getAdminCredentials(): { username: string; password: string } {
  return { username: ADMIN_USERNAME, password: ADMIN_PASSWORD };
}
