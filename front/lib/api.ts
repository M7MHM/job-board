const API_URL = 'https://localhost:7161/api'

// Auth endpoints
export const authApi = {
  login: async (data: { email: string; password: string }) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  register: async (data: { name: string; email: string; password: string; role: string }) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return response.json()
  },
}

// Jobs endpoints
export const jobsApi = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/jobs`)
    return response.json()
  },

  create: async (data: { title: string; description: string }, token: string) => {
    const response = await fetch(`${API_URL}/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
    })
    return response.json()
  },
}

// Applications endpoints
export const applicationsApi = {
  apply: async (jobId: number, token: string) => {
    const response = await fetch(`${API_URL}/applications/apply/${jobId}`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.json()
  },

  getMine: async (token: string) => {
    const response = await fetch(`${API_URL}/applications/my`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.json()
  },

  updateStatus: async (appId: number, status: string, token: string) => {
    const response = await fetch(`${API_URL}/applications/status/${appId}?status=${status}`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response.json()
  },
}