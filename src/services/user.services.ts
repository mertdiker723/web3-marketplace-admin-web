import type { AxiosError } from 'axios'

import api from '@/utils/axios'
import type { IUserResponseType, IUserReturnType } from '@/types/user/user.model'

class UserServices {
  async getUsers(): Promise<IUserReturnType> {
    try {
      const response = await api.get<IUserResponseType>('/users')
      const { data, message, success } = response.data || {}
      return {
        data,
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

export default new UserServices()
