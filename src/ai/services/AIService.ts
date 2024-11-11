import { AIResponse, AIRequest } from '../models/AITypes'

export class AIService {
  private static instance: AIService
  private baseUrl: string

  private constructor() {
    this.baseUrl = process.env.AI_SERVICE_URL || 'http://localhost:3000/api/ai'
  }

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService()
    }
    return AIService.instance
  }

  async processDocument(file: File): Promise<AIResponse> {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(`${this.baseUrl}/process-document`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Failed to process document')
    }

    return response.json()
  }

  async getChatResponse(request: AIRequest): Promise<string> {
    const response = await fetch(`${this.baseUrl}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      throw new Error('Failed to get chat response')
    }

    const data = await response.json()
    return data.response
  }
} 