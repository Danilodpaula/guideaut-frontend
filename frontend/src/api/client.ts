import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // backend configurado no .env
  timeout: 10000, // 10 segundos
  headers: {
    "Content-Type": "application/json",
  },
})

// Intercepta requisições (pode adicionar token se necessário)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token") // ou useAuthContext
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

// Intercepta respostas (para tratar erros globais)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erro na API:", error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export default api
