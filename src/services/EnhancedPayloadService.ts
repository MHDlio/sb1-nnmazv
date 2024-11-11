import { Payload } from 'payload'
import { Form, FormSubmission } from '../types'

export class EnhancedPayloadService {
  private static instance: EnhancedPayloadService
  private payload: Payload

  private constructor() {
    this.payload = new Payload({
      // Enhanced configuration
      email: {
        fromName: 'BureauEase',
        fromAddress: 'noreply@bureauease.com',
      },
      rateLimit: {
        window: 15 * 60 * 1000, // 15 minutes
        max: 100, // requests
      },
      hooks: {
        afterError: [(err) => {
          // Error logging and monitoring
          console.error('Payload Error:', err)
        }]
      }
    })
  }

  public static getInstance(): EnhancedPayloadService {
    if (!EnhancedPayloadService.instance) {
      EnhancedPayloadService.instance = new EnhancedPayloadService()
    }
    return EnhancedPayloadService.instance
  }

  async createForm(formData: Partial<Form>): Promise<Form> {
    try {
      const form = await this.payload.create({
        collection: 'forms',
        data: formData
      })
      return form
    } catch (error) {
      console.error('Form creation error:', error)
      throw error
    }
  }

  async processSubmission(submission: FormSubmission): Promise<void> {
    const session = await this.payload.create({
      collection: 'submissions',
      data: submission
    })

    // Trigger workflow
    await this.triggerWorkflow('form_submission', {
      submissionId: session.id,
      formId: submission.formId
    })
  }
} 