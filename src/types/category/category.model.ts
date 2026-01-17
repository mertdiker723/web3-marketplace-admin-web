import type { IPagination } from '..'

export interface ICategory {
  id?: string
  name: string
  createdAt?: string
  updatedAt?: string
}
export interface ISingleCategoryResponseType {
  data: ICategory
  message: string
  success: boolean
}
export interface ISingleCategoryReturnType {
  data: ICategory | null
  message: string
  success: boolean
}

export interface ICategoryResponseType {
  data: ICategory[]
  message: string
  success: boolean
  pagination: IPagination
}

export interface ICategoryReturnType {
  data: ICategory[] | null
  message: string
  success: boolean
  pagination?: IPagination
}
