export interface FormField {
  id: string;
  label: string;
  type: string;
  value?: string;
}

export interface FormTemplate {
  id: string;
  name: string;
  description: string;
  fields: FormField[];
  fileUrl: string;
}

export interface OCRResponse {
  extractedFields: Record<string, string>;
  suggestedForms: {
    id: string;
    name: string;
  }[];
} 