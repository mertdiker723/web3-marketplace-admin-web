import type { IDistrict, IProvince, INeighborhood } from '../location/location.model'

export interface IUserType {
  id: number
  name: string
}

export interface IUser {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  openAddress?: string
  provinceId: number
  districtId: number
  neighborhoodId: number
  provinces: IProvince
  districts: IDistrict
  neighborhoods: INeighborhood
  createdAt?: Date
  updatedAt?: Date
  userType: number
  userTypes: IUserType
}

export interface IUserResponseType {
  data: IUser[]
  message: string
  success: boolean
}

export interface IUserReturnType {
  data: IUser[] | null
  message: string
  success: boolean
}
