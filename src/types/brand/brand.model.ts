import type { IPagination } from '..'

export interface IBrand {
  id?: string
  name: string
  createdAt?: string
  updatedAt?: string
}

export interface ISingleBrandResponseType {
  data: IBrand
  message: string
  success: boolean
}
export interface ISingleBrandReturnType {
  data: IBrand | null
  message: string
  success: boolean
}

export interface IBrandResponseType {
  data: IBrand[]
  message: string
  success: boolean
  pagination: IPagination
}

export interface IBrandReturnType {
  data: IBrand[] | null
  message: string
  success: boolean
  pagination?: IPagination
}
