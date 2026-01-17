import type {
  ICategory,
  ICategoryResponseType,
  ICategoryReturnType,
  ISingleCategoryResponseType,
  ISingleCategoryReturnType,
} from '@/types/category/category.model'
import api from '@/utils/axios'
import type { AxiosError } from 'axios'

class CategoryServices {
  async getCategories(page: number = 1, limit: number = 5): Promise<ICategoryReturnType> {
    try {
      const response = await api.get<ICategoryResponseType>('/categories', {
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
  async createCategory(category: Partial<ICategory>): Promise<ISingleCategoryReturnType> {
    try {
      const response = await api.post<ISingleCategoryResponseType>('/categories', category)
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
  async deleteCategory(categoryId: string): Promise<ISingleCategoryReturnType> {
    try {
      const response = await api.delete<ISingleCategoryResponseType>(`/categories/${categoryId}`)
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
  async getCategoryById(categoryId: string): Promise<ISingleCategoryReturnType> {
    try {
      const response = await api.get<ISingleCategoryResponseType>(`/categories/${categoryId}`)
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
  async updateCategory(
    categoryId: string,
    category: Partial<ICategory>,
  ): Promise<ISingleCategoryReturnType> {
    try {
      const response = await api.put<ISingleCategoryResponseType>(
        `/categories/${categoryId}`,
        category,
      )
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

export default new CategoryServices()
