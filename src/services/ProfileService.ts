import { UserProfile, ProfileFormData } from '../types/user'

class ProfileService {
  private static instance: ProfileService
  private baseUrl: string

  private constructor() {
    this.baseUrl = process.env.API_URL || '/api'
  }

  public static getInstance(): ProfileService {
    if (!ProfileService.instance) {
      ProfileService.instance = new ProfileService()
    }
    return ProfileService.instance
  }

  async getProfile(): Promise<UserProfile> {
    const response = await fetch(`${this.baseUrl}/profile`)
    if (!response.ok) throw new Error('Failed to fetch profile')
    return response.json()
  }

  async updateProfile(data: ProfileFormData): Promise<UserProfile> {
    const response = await fetch(`${this.baseUrl}/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!response.ok) throw new Error('Failed to update profile')
    return response.json()
  }

  async uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
    const formData = new FormData()
    formData.append('avatar', file)

    const response = await fetch(`${this.baseUrl}/profile/avatar`, {
      method: 'POST',
      body: formData
    })
    if (!response.ok) throw new Error('Failed to upload avatar')
    return response.json()
  }
}

export default ProfileService 