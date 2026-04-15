export const authUtils = {
  setToken: (token: string) => {
    localStorage.setItem('token', token)
  },

  getToken: (): string | null => {
    return localStorage.getItem('token')
  },

  removeToken: () => {
    localStorage.removeItem('token')
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token')
  }
}