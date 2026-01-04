import type { AxiosError } from 'axios'

import api from '@/utils/axios'
import type { IUserResponseType, IUserReturnType } from '@/types/user/user.model'

class UserServices {
  async getUsers(page: number = 1, limit: number = 5): Promise<IUserReturnType> {
    try {
      const response = await api.get<IUserResponseType>('/users', {
        params: { page, limit },
      })
      const { data, message, success, pagination } = response.data || {}
      return {
        data,
        message,
        success,
        pagination,
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
