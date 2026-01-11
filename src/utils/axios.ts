import axios from 'axios'
import { getToken, removeToken } from './token'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

api.interceptors.request.use(
  (config) => {
    const token = getToken()

    if (token) {
      config.headers.Authentication = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      removeToken()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default api
