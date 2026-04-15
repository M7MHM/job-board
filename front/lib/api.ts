const API_URL = 'http://localhost:5067/api'

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

export const jobsApi = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/jobs`)
    return response.json()
  },

  create: async (data: { title: string; description: string }) => {
    const response = await fetch(`${API_URL}/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return response.json()
  },
}

export const applicationsApi = {
  apply: async (jobId: number) => {
    const response = await fetch(`${API_URL}/applications/apply/${jobId}`, {
      method: 'POST',
    })
    return response.json()
  },

  getMine: async () => {
    const response = await fetch(`${API_URL}/applications/my`, {
    })
    return response.json()
  },

  updateStatus: async (appId: number, status: string) => {
    const response = await fetch(`${API_URL}/applications/status/${appId}?status=${status}`, {
      method: 'PUT',
    })
    return response.json()
  },
}