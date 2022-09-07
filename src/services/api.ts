import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL

const apiService = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default apiService
