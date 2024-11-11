import { Payload } from 'payload'
import { N8NService } from './N8NService'

export class WorkflowService {
  private n8n: N8NService
  private payload: Payload

  constructor() {
    this.n8n = N8NService.getInstance()
  }

  async triggerWorkflow(type: 'form_submission' | 'document_processed', data: any) {
    // Store workflow state in Payload
    const workflow = await payload.create({
      collection: 'workflows',
      data: {
        type,
        status: 'started',
        data
      }
    })

    // Trigger N8N workflow
    const result = await this.n8n.executeWorkflow(type, {
      ...data,
      workflowId: workflow.id
    })

    // Update workflow state
    await payload.update({
      collection: 'workflows',
      id: workflow.id,
      data: {
        status: 'completed',
        result
      }
    })

    return result
  }
} 