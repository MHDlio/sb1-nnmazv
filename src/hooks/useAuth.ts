import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import AuthService from '../services/AuthService'
import { AuthUser, LoginCredentials, RegisterData, AuthError } from '../types/auth'

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<AuthError | null>(null)
  const { t } = useTranslation()

  const handleAuthOperation = async <T>(operation: () => Promise<T>): Promise<T | null> => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await operation()
      return result
    } catch (err) {
      setError({
        code: 'auth_error',
        message: t('auth.error.generic')
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const login = useCallback(async (credentials: LoginCredentials) => {
    const response = await handleAuthOperation(() => 
      AuthService.getInstance().login(credentials)
    )
    if (response) {
      setUser(response.user)
    }
    return response
  }, [])

  const register = useCallback(async (data: RegisterData) => {
    const response = await handleAuthOperation(() => 
      AuthService.getInstance().register(data)
    )
    if (response) {
      setUser(response.user)
    }
    return response
  }, [])

  const loginWithProvider = useCallback(async (provider: 'google' | 'facebook') => {
    await handleAuthOperation(() => 
      AuthService.getInstance().loginWithProvider(provider)
    )
  }, [])

  const logout = useCallback(async () => {
    await handleAuthOperation(() => AuthService.getInstance().logout())
    setUser(null)
  }, [])

  const resetPassword = useCallback(async (email: string) => {
    await handleAuthOperation(() => 
      AuthService.getInstance().resetPassword(email)
    )
  }, [])

  return {
    user,
    isLoading,
    error,
    login,
    register,
    loginWithProvider,
    logout,
    resetPassword
  }
} 