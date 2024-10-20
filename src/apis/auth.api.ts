import { AuthResponse } from '../types/auth.type'
import http from '../utils/http'

const authApi = {
  registerAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>('auth/register/', body)
  },
  loginAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>('auth/login/', body)
  },
  logoutAccount() {
    return http.post('auth/logout/')
  }
}

export default authApi
