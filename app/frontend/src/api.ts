const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

async function request<T>(path: string, options: RequestInit = {}) {
  const response = await fetch(`${API_URL}${path}`, { ...options, credentials: 'include' })
  const body = await response.json().catch(() => null)
  if (!response.ok) throw new Error(body?.message || 'Request failed')
  return body as T
}

export type ApiMediaFile = { _id: string; name: string; type: string; size: number; url: string; createdAt: string }
export type ApiUser = { id: string; email: string }

export function login(email: string, password: string) { return request<{ user: ApiUser }>('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) }) }
export function register(email: string, password: string) { return request<{ user: ApiUser }>('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) }) }
export function me() { return request<{ user: ApiUser }>('/api/auth/me') }
export function logout() { return request<void>('/api/auth/logout', { method: 'POST' }) }
export function listFiles() { return request<ApiMediaFile[]>('/api/files') }
export function uploadFile(file: File) { const body = new FormData(); body.append('file', file); return request<ApiMediaFile>('/api/files', { method: 'POST', body }) }
export function deleteFile(id: string) { return request<void>(`/api/files/${id}`, { method: 'DELETE' }) }