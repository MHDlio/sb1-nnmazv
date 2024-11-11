import { AuthUser, LoginCredentials, RegisterData, AuthResponse } from '../types/auth'

class AuthService {
  private static instance: AuthService
  private baseUrl: string
  private token: string | null = null

  private constructor() {
    this.baseUrl = process.env.API_URL || '/api'
    this.token = localStorage.getItem('auth_token')
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  private async handleAuthResponse(response: Response): Promise<AuthResponse> {
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message)
    }
    const data = await response.json()
    this.token = data.token
    localStorage.setItem('auth_token', data.token)
    return data
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
    return this.handleAuthResponse(response)
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return this.handleAuthResponse(response)
  }

  async loginWithProvider(provider: 'google' | 'facebook'): Promise<void> {
    window.location.href = `${this.baseUrl}/auth/${provider}`
  }

  async logout(): Promise<void> {
    localStorage.removeItem('auth_token')
    this.token = null
  }

  async resetPassword(email: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message)
    }
  }

  getToken(): string | null {
    return this.token
  }
}

export default AuthService 