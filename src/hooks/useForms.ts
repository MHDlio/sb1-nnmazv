import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import APIService from '../services/APIService'
import { Form, FormSubmission } from '../types/forms'

export const useForms = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const { t } = useTranslation()

  const submitForm = useCallback(async (formId: string, data: Record<string, any>) => {
    setIsLoading(true)
    setError(null)
    try {
      const service = APIService.getInstance()
      await service.submitForm(formId, data)
    } catch (err) {
      setError(new Error(t('forms.error.submission')))
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [t])

  return {
    isLoading,
    error,
    submitForm
  }
} 