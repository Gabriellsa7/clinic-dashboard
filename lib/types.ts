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
  // Doctors have no user role; the backend flags the health professional
  // record with isDoctor to grant access to the panel.
  isDoctor?: boolean
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
  // Regular accounts (ADMIN / USER) come back as a user.
  user?: IUser
  // Doctors are stored as health professionals and carry the isDoctor flag.
  healthProfessional?: IHealthProfessional
}
