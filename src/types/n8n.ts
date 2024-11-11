export interface Workflow {
  id: string
  name: string
  status: 'active' | 'inactive' | 'error'
  lastRun: string
  active: boolean
  nodes: WorkflowNode[]
}

export interface WorkflowNode {
  id: string
  type: string
  position: [number, number]
  parameters: Record<string, any>
}

export interface WorkflowExecution {
  id: string
  workflowId: string
  status: 'success' | 'error' | 'running'
  startTime: string
  endTime?: string
  data: Record<string, any>
}

export interface N8NError {
  code: string
  message: string
  details?: Record<string, any>
}

export interface WorkflowTriggerOptions {
  workflowId: string
  data?: Record<string, any>
  runOnce?: boolean
} 