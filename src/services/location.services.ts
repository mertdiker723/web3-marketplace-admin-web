import type {
  IDistrictResponseType,
  INeighborhoodResponseType,
  IProvinceResponseType,
} from '@/types/location/location.model'
import api from '@/utils/axios'
import type { AxiosError } from 'axios'

class LocationService {
  async getProvinces(): Promise<IProvinceResponseType> {
    try {
      const response = await api.get<IProvinceResponseType>('/provinces')
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

  async getDistrictsByProvince(provinceId: number): Promise<IDistrictResponseType> {
    try {
      const response = await api.get<IDistrictResponseType>(`/districts/${provinceId}`)
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

  async getNeighborhoodsByDistrict(districtId: number): Promise<INeighborhoodResponseType> {
    try {
      const response = await api.get<INeighborhoodResponseType>(`/neighborhoods/${districtId}`)
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
export default new LocationService()
