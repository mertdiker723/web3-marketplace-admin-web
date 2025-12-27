import type { IUser } from '../user/user.model'

export interface ILoginUserType {
  email: string
  password: string
}

export interface ILoginServiceResponseType {
  data: {
    user: IUser
    token: string
  }
  message: string
  success: boolean
}

export interface ILoginReturnType {
  data: IUser | null
  message: string
  success: boolean
}
