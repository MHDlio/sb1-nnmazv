export interface AuthUser {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
  emailVerified: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData extends LoginCredentials {
  name: string
  confirmPassword: string
}

export interface AuthResponse {
  user: AuthUser
  token: string
}

export interface AuthError {
  code: string
  message: string
} 