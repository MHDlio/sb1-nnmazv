import { Workflow, WorkflowExecution, WorkflowTriggerOptions, N8NError } from '../types/n8n'

class N8NService {
  private static instance: N8NService
  private baseUrl: string
  private apiKey: string

  private constructor() {
    this.baseUrl = process.env.VITE_N8N_API_URL || 'http://localhost:5678/api/v1'
    this.apiKey = process.env.VITE_N8N_API_KEY || ''
  }

  public static getInstance(): N8NService {
    if (!N8NService.instance) {
      N8NService.instance = new N8NService()
    }
    return N8NService.instance
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'X-N8N-API-KEY': this.apiKey,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      const error: N8NError = await response.json()
      throw new Error(error.message)
    }

    return response.json()
  }

  async getWorkflows(): Promise<Workflow[]> {
    return this.request<Workflow[]>('/workflows')
  }

  async executeWorkflow(workflowId: string, data?: Record<string, any>): Promise<WorkflowExecution> {
    return this.request<WorkflowExecution>(`/workflows/${workflowId}/execute`, {
      method: 'POST',
      body: JSON.stringify({ data }),
    })
  }

  async toggleWorkflow(workflowId: string, active: boolean): Promise<Workflow> {
    return this.request<Workflow>(`/workflows/${workflowId}`, {
      method: 'PATCH',
      body: JSON.stringify({ active }),
    })
  }

  async getExecutionHistory(workflowId: string): Promise<WorkflowExecution[]> {
    return this.request<WorkflowExecution[]>(`/workflows/${workflowId}/executions`)
  }

  async retryExecution(executionId: string): Promise<WorkflowExecution> {
    return this.request<WorkflowExecution>(`/executions/${executionId}/retry`, {
      method: 'POST',
    })
  }
}

export default N8NService 