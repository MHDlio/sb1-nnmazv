export interface UserProfile {
  id: string
  name: string
  email: string
  bio?: string
  avatarUrl?: string
  notifications: {
    email: boolean
    push: boolean
  }
  language: string
  theme: 'light' | 'dark' | 'system'
}

export interface ProfileFormData {
  name: string
  email: string
  bio: string
  currentPassword?: string
  newPassword?: string
  confirmPassword?: string
  language: string
  theme: 'light' | 'dark' | 'system'
} 