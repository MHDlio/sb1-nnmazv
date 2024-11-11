import { Payload } from 'payload'
import { Form, FormSubmission } from '../types/forms'
import { N8NService } from './N8NService'

class PayloadService {
  private static instance: PayloadService
  private payload: Payload
  private n8nService: N8NService

  private constructor() {
    this.n8nService = N8NService.getInstance()
    this.payload = new Payload({
      collections: [
        {
          slug: 'forms',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'fields',
              type: 'array',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                },
                {
                  name: 'type',
                  type: 'select',
                  options: ['text', 'number', 'date', 'file', 'select']
                }
              ]
            }
          ]
        }
      ],
      plugins: [
        // Add plugins here
      ]
    })
  }

  public static getInstance(): PayloadService {
    if (!PayloadService.instance) {
      PayloadService.instance = new PayloadService()
    }
    return PayloadService.instance
  }

  async createForm(form: Partial<Form>): Promise<Form> {
    const result = await this.payload.create({
      collection: 'forms',
      data: form
    })
    
    // Trigger N8N workflow
    await this.n8nService.executeWorkflow('form_created', { formId: result.id })
    
    return result
  }

  async processFormSubmission(submission: FormSubmission): Promise<void> {
    const result = await this.payload.create({
      collection: 'submissions',
      data: submission
    })

    await this.n8nService.executeWorkflow('form_submitted', {
      submissionId: result.id,
      formId: submission.formId
    })
  }
}

export default PayloadService 