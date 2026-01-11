import type { AxiosError } from 'axios'

import type {
  IRegisterUserType,
  IRegisterServiceResponseType,
  IRegisterReturnType,
} from '@/types/register/register.model'

import api from '@/utils/axios'
import { setToken } from '@/utils/token'

class RegisterServices {
  async register(userData: IRegisterUserType): Promise<IRegisterReturnType> {
    try {
      const { firstName, lastName, email, password, confirmPassword } = userData || {}
      const response = await api.post<IRegisterServiceResponseType>('/users/register', {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
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

export default new RegisterServices()
