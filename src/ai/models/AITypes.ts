export interface AIRequest {
  prompt: string
  context?: string
  previousMessages?: Message[]
}

export interface AIResponse {
  extractedFields: Record<string, string>
  suggestedForms: Array<{
    id: string
    name: string
    confidence: number
  }>
  analysis: DocumentAnalysis
}

export interface DocumentAnalysis {
  documentType: string
  confidence: number
  extractedData: Record<string, string>
  metadata: Record<string, any>
}

export interface Message {
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
} 