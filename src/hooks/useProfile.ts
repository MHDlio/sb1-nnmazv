import { useState, useCallback } from 'react'
import { UserProfile, ProfileFormData } from '../types/user'
import ProfileService from '../services/ProfileService'
import { useTranslation } from 'react-i18next'

export const useProfile = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { t } = useTranslation()

  const handleProfileOperation = async <T>(operation: () => Promise<T>): Promise<T | null> => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await operation()
      return result
    } catch (err) {
      setError(t('profile.error.generic'))
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const getProfile = useCallback(() => {
    return handleProfileOperation(() => ProfileService.getInstance().getProfile())
  }, [])

  const updateProfile = useCallback((data: ProfileFormData) => {
    return handleProfileOperation(() => ProfileService.getInstance().updateProfile(data))
  }, [])

  const uploadAvatar = useCallback((file: File) => {
    return handleProfileOperation(() => ProfileService.getInstance().uploadAvatar(file))
  }, [])

  return {
    isLoading,
    error,
    getProfile,
    updateProfile,
    uploadAvatar
  }
} 