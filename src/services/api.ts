import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL
const token = localStorage.getItem('token')
const locale = localStorage.getItem('locale') || 'cs'

const apiService = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': locale,
  },
})

if (token)
  apiService.defaults.headers.common.Authorization = `Bearer ${token}`

export default apiService
