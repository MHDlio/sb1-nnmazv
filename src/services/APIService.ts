import PayloadService from './PayloadService'
import { N8NService } from './N8NService'
import { AIService } from './AIService'
import { Form, FormSubmission } from '../types/forms'

class APIService {
  private static instance: APIService
  private payloadService: PayloadService
  private n8nService: N8NService
  private aiService: AIService

  private constructor() {
    this.payloadService = PayloadService.getInstance()
    this.n8nService = N8NService.getInstance()
    this.aiService = AIService.getInstance()
  }

  public static getInstance(): APIService {
    if (!APIService.instance) {
      APIService.instance = new APIService()
    }
    return APIService.instance
  }

  async processDocument(file: File) {
    // 1. Extract data using AI
    const extractedData = await this.aiService.processDocument(file)

    // 2. Store in Payload
    const document = await this.payloadService.createDocument({
      file,
      extractedData
    })

    // 3. Trigger N8N workflow
    await this.n8nService.executeWorkflow('document_processed', {
      documentId: document.id,
      extractedData
    })

    return document
  }

  async submitForm(formId: string, data: Record<string, any>) {
    const submission: FormSubmission = {
      formId,
      data,
      status: 'pending',
      createdAt: new Date().toISOString()
    }

    await this.payloadService.processFormSubmission(submission)
  }
}

export default APIService 