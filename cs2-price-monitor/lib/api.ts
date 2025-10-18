const BASE = process.env.NEXT_PUBLIC_API_BASE;

type MockLoader = () => Promise<unknown>;

const MOCK_LOADERS: Record<string, MockLoader> = {
  '/v1/now': async () => (await import('@/mocks/now.json')).default
};

function getMockLoader(path: string): MockLoader | undefined {
  try {
    const url = new URL(path, 'https://mock.local');
    return MOCK_LOADERS[url.pathname];
  } catch (error) {
    console.error('Failed to resolve mock loader for path', path, error);
    return undefined;
  }
}

/**
 * Fetch wrapper respecting API error structure.
 */
export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const useMock = !BASE && process.env.NODE_ENV === 'development';

  if (useMock) {
    const loader = getMockLoader(path);
    if (loader) {
      return loader() as Promise<T>;
    }
    throw new Error(`Mock not found for path: ${path}`);
  }

  const res = await fetch(`${BASE ?? ''}${path}`, {
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
