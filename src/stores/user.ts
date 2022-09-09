import { defineStore } from 'pinia'
import { useCollectionStore } from './collection'
import apiService from '@/services/api'

interface Credentials {
  email: string
  password: string
}

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    token: '',
  }),
  getters: {
    isAuthenticated: state => !!state.token,
  },
  actions: {
    async register(credentials: Credentials, rememberMe: boolean) {
      const { data } = await apiService.post('/register', credentials)
      this.setToken(data.token, { rememberMe })
      await useCollectionStore().fetchCollections()
    },
    async login(credentials: Credentials, rememberMe: boolean) {
      const { data } = await apiService.post('/login', credentials)
      this.setToken(data.token, { rememberMe })
      await useCollectionStore().fetchCollections()
    },
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
