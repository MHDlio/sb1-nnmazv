import { OCRResponse, FormTemplate } from '@/types/backend'
import { PayloadService } from './PayloadService'
import { N8NService } from './N8NService'

class APIService {
  private static instance: APIService
  private payloadService: PayloadService
  private n8nService: N8NService
  private baseUrl: string

  private constructor() {
    this.baseUrl = process.env.VITE_API_URL || '/.netlify/functions/api'
    this.payloadService = PayloadService.getInstance()
    this.n8nService = N8NService.getInstance()
  }

  public static getInstance(): APIService {
    if (!APIService.instance) {
      APIService.instance = new APIService()
    }
    return APIService.instance
  }

  async processOCR(file: File): Promise<OCRResponse> {
    try {
      const formData = new FormData()
      formData.append('file', file)

      // Start N8N workflow for OCR processing
      const workflowResult = await this.n8nService.executeWorkflow('ocr_process', { file })

      // Store result in Payload
      const document = await this.payloadService.createDocument({
        file,
        extractedData: workflowResult.data
      })

      return {
        extractedFields: workflowResult.data,
        documentId: document.id
      }
    } catch (error) {
      console.error('OCR processing error:', error)
      throw new Error('OCR processing failed')
    }
  }

  async getForms(): Promise<FormTemplate[]> {
    try {
      const forms = await this.payloadService.getForms({
        where: {
          status: {
            equals: 'published'
          }
        }
      })
      return forms
    } catch (error) {
      console.error('Error fetching forms:', error)
      throw new Error('Failed to fetch forms')
    }
  }

  async submitForm(formId: string, data: Record<string, string>): Promise<void> {
    try {
      // Create submission in Payload
      const submission = await this.payloadService.createSubmission({
        formId,
        data
      })

      // Trigger N8N workflow for form processing
      await this.n8nService.executeWorkflow('form_submitted', {
        submissionId: submission.id,
        formData: data
      })
    } catch (error) {
      console.error('Form submission error:', error)
      throw new Error('Form submission failed')
    }
  }
}

export const apiService = APIService.getInstance() 