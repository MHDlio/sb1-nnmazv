import { useState, useCallback } from 'react'
import { AIService } from '../ai/services/AIService'
import { AIResponse, AIRequest } from '../ai/models/AITypes'

export const useAI = () => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const processDocument = useCallback(async (file: File): Promise<AIResponse | null> => {
    setIsProcessing(true)
    setError(null)
    
    try {
      const aiService = AIService.getInstance()
      const response = await aiService.processDocument(file)
      return response
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      return null
    } finally {
      setIsProcessing(false)
    }
  }, [])

  const getChatResponse = useCallback(async (request: AIRequest): Promise<string | null> => {
    setIsProcessing(true)
    setError(null)

    try {
      const aiService = AIService.getInstance()
      const response = await aiService.getChatResponse(request)
      return response
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      return null
    } finally {
      setIsProcessing(false)
    }
  }, [])

  return {
    processDocument,
    getChatResponse,
    isProcessing,
    error,
  }
} 