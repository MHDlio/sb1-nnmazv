export interface FormField {
  label: string
  type: 'text' | 'number' | 'date' | 'file' | 'select'
  required?: boolean
  pattern?: string
  options?: string[]
}

export interface Form {
  id: string
  name: string
  status: 'draft' | 'published' | 'archived'
  fields: FormField[]
  createdAt: string
  updatedAt: string
}

export interface FormSubmission {
  id: string
  formId: string
  data: Record<string, any>
  status: 'pending' | 'processed' | 'error'
  createdAt: string
} 