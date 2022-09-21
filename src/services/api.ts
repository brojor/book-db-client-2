import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL
const token = localStorage.getItem('token')

const apiService = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

if (token)
  apiService.defaults.headers.common.Authorization = `Bearer ${token}`

export default apiService
