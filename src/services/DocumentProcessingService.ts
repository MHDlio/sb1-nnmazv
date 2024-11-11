import { File } from 'payload/types'
import { AIService } from './AIService'

export class DocumentProcessingService {
  private aiService: AIService

  constructor() {
    this.aiService = AIService.getInstance()
  }

  async processDocument(file: File) {
    // 1. Store document in Payload
    const storedFile = await payload.create({
      collection: 'media',
      data: {
        file: file
      }
    })

    // 2. Process with OCR
    const extractedData = await this.aiService.processDocument(file)

    // 3. Store results
    const processedDoc = await payload.create({
      collection: 'processedDocuments',
      data: {
        originalFile: storedFile.id,
        extractedData,
        status: 'processed'
      }
    })

    return processedDoc
  }
} 