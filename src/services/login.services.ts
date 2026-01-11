import type { AxiosError } from 'axios'
import api from '@/utils/axios'
import { setToken } from '@/utils/token'

// Types
import type {
  ILoginServiceResponseType,
  ILoginUserType,
  ILoginReturnType,
} from '@/types/login/login.model'

class LoginServices {
  async login(userData: ILoginUserType): Promise<ILoginReturnType> {
    try {
      const { email, password } = userData || {}
      const response = await api.post<ILoginServiceResponseType>('/users/login', {
        email,
        password,
      })

      const { data, message, success } = response.data || {}
      const { token, user } = data || {}

      setToken(token)

      return {
        data: user,
        message,
        success,
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>
      const message = axiosError.response?.data?.message || 'An unknown error occurred'

      return {
        data: null,
        message,
        success: false,
      }
    }
  }
}

export default new LoginServices()
