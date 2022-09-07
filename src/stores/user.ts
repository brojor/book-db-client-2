import { defineStore } from 'pinia'
import apiService from '@/services/api'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    token: '',
  }),
  getters: {
    isAuthenticated: state => !!state.token,
  },
  actions: {
    setToken(token: string, { rememberMe }: { rememberMe: boolean }) {
      this.token = token
      apiService.defaults.headers.common.Authorization = `Bearer ${token}`
      if (rememberMe)
        localStorage.setItem('token', token)
    },
    logout() {
      this.token = ''
      localStorage.clear()
      window.location.replace('/')
    },
  },
})
