import { useState, useCallback } from 'react'
import N8NService from '../services/N8NService'
import { Workflow, Trigger, Action, ExecutionHistory, N8NError } from '../types/n8n'

export const useN8N = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<N8NError | null>(null)

  const handleN8NOperation = async <T>(operation: () => Promise<T>): Promise<T | null> => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await operation()
      return result
    } catch (err) {
      setError(err as N8NError)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const getWorkflows = useCallback(() => {
    return handleN8NOperation(() => N8NService.getInstance().getWorkflows())
  }, [])

  const updateWorkflowStatus = useCallback((id: string, active: boolean) => {
    return handleN8NOperation(() => N8NService.getInstance().updateWorkflowStatus(id, active))
  }, [])

  const getTriggers = useCallback(() => {
    return handleN8NOperation(() => N8NService.getInstance().getTriggers())
  }, [])

  const getActions = useCallback(() => {
    return handleN8NOperation(() => N8NService.getInstance().getActions())
  }, [])

  const getExecutionHistory = useCallback(() => {
    return handleN8NOperation(() => N8NService.getInstance().getExecutionHistory())
  }, [])

  return {
    isLoading,
    error,
    getWorkflows,
    updateWorkflowStatus,
    getTriggers,
    getActions,
    getExecutionHistory,
  }
} 