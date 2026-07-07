export enum EUserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  DOCTOR = "DOCTOR",
}

export interface IUser {
  _id: string
  name: string
  email: string
  role?: EUserRole
  // Doctors are created as health professionals and have no role.
  // The backend flags them with isDoctor instead.
  isDoctor?: boolean
  active?: boolean
  createdAt: Date
}

export interface IHealthUnitAddress {
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
}

export interface IHealthUnit {
  _id: string
  name: string
  address: IHealthUnitAddress
  phone: string
  email: string
  img?: string
  createdAt: Date
}

export interface IHealthProfessional {
  _id: string
  healthUnitId: string
  specialty: string
  name: string
  email: string
  password: string
  professionalLicense: string
  active: boolean
  createdAt: Date
  updatedAt: Date
}

// Auth payloads
export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
  role?: EUserRole
}

export interface AuthResponse {
  token: string
  user: IUser
}
