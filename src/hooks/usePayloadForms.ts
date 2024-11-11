import { useState, useCallback } from 'react'
import { EnhancedPayloadService } from '../services/EnhancedPayloadService'
import { Form, FormSubmission } from '../types'

export const usePayloadForms = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const createForm = useCallback(async (formData: Partial<Form>) => {
    setIsLoading(true)
    try {
      const service = EnhancedPayloadService.getInstance()
      const form = await service.createForm(formData)
      return form
    } catch (err) {
      setError(err as Error)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const submitForm = useCallback(async (submission: FormSubmission) => {
    setIsLoading(true)
    try {
      const service = EnhancedPayloadService.getInstance()
      await service.processSubmission(submission)
    } catch (err) {
      setError(err as Error)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    isLoading,
    error,
    createForm,
    submitForm
  }
} 