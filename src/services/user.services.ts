import type { AxiosError } from 'axios'

import api from '@/utils/axios'

import type {
  ISingleUserResponseType,
  ISingleUserReturnType,
  IUser,
  IUserResponseType,
  IUserReturnType,
} from '@/types/user/user.model'

class UserServices {
  async getUserMe(): Promise<ISingleUserReturnType> {
    try {
      const response = await api.get<ISingleUserResponseType>('/users/me')
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

  async updateUser(userId: string, userData: Partial<IUser>): Promise<IUserReturnType> {
    try {
      const response = await api.put<IUserResponseType>(`/users/${userId}`, userData)
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

  async updateProfile(userId: string, userData: Partial<IUser>): Promise<IUserReturnType> {
    try {
      const response = await api.put<IUserResponseType>(`/users/${userId}/profile`, userData)
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

  async deleteUser(userId: string): Promise<IUserReturnType> {
    try {
      const response = await api.delete<IUserResponseType>(`/users/${userId}`)
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

  async getSelectedUser(userId: string): Promise<ISingleUserReturnType> {
    try {
      const response = await api.get<ISingleUserResponseType>(`/users/${userId}`)
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
