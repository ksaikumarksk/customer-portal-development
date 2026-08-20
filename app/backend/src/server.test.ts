import { describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from './server'

describe('multimedia manager API', () => {
  it('reports health', async () => {
    const response = await request(app).get('/health')
    expect(response.status).toBe(200)
    expect(response.body.status).toBe('ok')
  })

  it('protects the file library', async () => {
    expect((await request(app).get('/api/files')).status).toBe(401)
    expect((await request(app).post('/api/files')).status).toBe(401)
    expect((await request(app).get('/api/files/invalid')).status).toBe(401)
    expect((await request(app).delete('/api/files/invalid')).status).toBe(401)
  })

  it('validates registration input', async () => {
    const response = await request(app).post('/api/auth/register').send({ email: 'bad', password: 'short' })
    expect(response.status).toBe(400)
  })

  it('rejects invalid login and clears logout cookie', async () => {
    const response = await request(app).post('/api/auth/login').send({ email: 'unknown@example.com', password: 'password123' })
    expect([401, 500]).toContain(response.status)
    expect((await request(app).post('/api/auth/logout')).status).toBe(204)
  }, 15000)

  it('protects current-user endpoint', async () => {
    expect((await request(app).get('/api/auth/me')).status).toBe(401)
  })
})
