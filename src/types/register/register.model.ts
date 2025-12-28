import type { IUser } from '../user/user.model'

export interface IRegisterUserType {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}
export interface IRegisterServiceResponseType {
  data: {
    user: IUser
    token: string
  }
  message: string
  success: boolean
}

export interface IRegisterReturnType {
  data: IUser | null
  message: string
  success: boolean
}
