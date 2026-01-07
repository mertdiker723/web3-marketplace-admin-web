export interface IProvince {
  id: number
  name: string
}

export interface IDistrict {
  id: number
  name: string
  provinceId: number
}

export interface INeighborhood {
  id: number
  name: string
  districtId: number
  provinceId: number
}

export interface IProvinceResponseType {
  data: IProvince[] | null
  message: string
  success: boolean
}

export interface IDistrictResponseType {
  data: IDistrict[] | null
  message: string
  success: boolean
}

export interface INeighborhoodResponseType {
  data: INeighborhood[] | null
  message: string
  success: boolean
}
