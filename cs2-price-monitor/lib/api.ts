const BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'https://api.example.com';

/**
 * Fetch wrapper respecting API error structure.
 */
export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
    ...init
  });

  if (!res.ok) {
    let message = `HTTP ${res.status}`;
    try {
      const body = await res.json();
      message = body?.error?.message ?? message;
    } catch (error) {
      console.error('Failed to parse error payload', error);
    }
    throw new Error(message);
  }

  return res.json() as Promise<T>;
}
