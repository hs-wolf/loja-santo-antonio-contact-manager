import { createClient } from './supabase/server';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export async function customFetch<T = unknown>(
  method: HttpMethod,
  path: string,
  body?: Record<string | number | symbol, unknown>,
  options?: RequestInit
): Promise<T> {
  const apiUrl = process.env.API_URL;

  const supabase = await createClient();
  const { data: sessionData } = await supabase.auth.getSession();
  const token = sessionData.session?.access_token;

  const headers = new Headers();
  headers.set('Authorization', `Bearer ${token}`);
  headers.set('Content-Type', 'application/json');

  const response = await fetch(`${apiUrl}${path}`, {
    ...options,
    method,
    headers,
    body: JSON.stringify(body),
  });

  console.log(response);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Fetch failed with status: ${response.status}, ${errorText}`
    );
  }

  return response.json() as Promise<T>;
}

export default customFetch;
