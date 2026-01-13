import type {
  IBrand,
  IBrandResponseType,
  IBrandReturnType,
  ISingleBrandResponseType,
  ISingleBrandReturnType,
} from '@/types/brand/brand.model'
import api from '@/utils/axios'
import type { AxiosError } from 'axios'

class BrandServices {
  async getBrands(page: number = 1, limit: number = 5): Promise<IBrandReturnType> {
    try {
      const response = await api.get<IBrandResponseType>('/brands', {
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
  async createBrand(brand: Partial<IBrand>): Promise<ISingleBrandReturnType> {
    try {
      const response = await api.post<ISingleBrandResponseType>('/brands', brand)
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
  async deleteBrand(brandId: string): Promise<ISingleBrandReturnType> {
    try {
      const response = await api.delete<ISingleBrandResponseType>(`/brands/${brandId}`)
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
  async getBrandById(brandId: string): Promise<ISingleBrandReturnType> {
    try {
      const response = await api.get<ISingleBrandResponseType>(`/brands/${brandId}`)
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
  async updateBrand(brandId: string, brand: Partial<IBrand>): Promise<ISingleBrandReturnType> {
    try {
      const response = await api.put<ISingleBrandResponseType>(`/brands/${brandId}`, brand)
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

export default new BrandServices()
