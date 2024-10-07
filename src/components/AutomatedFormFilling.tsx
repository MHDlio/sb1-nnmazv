import React, { useState } from 'react'
import { Upload, FileText, Check, AlertCircle } from 'lucide-react'
import FormEditor from './FormEditor'

interface SuggestedForm {
  id: string
  name: string
}

const AutomatedFormFilling: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [extractedData, setExtractedData] = useState<Record<string, string>>({})
  const [suggestedForms, setSuggestedForms] = useState<SuggestedForm[]>([])
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
      setError(null)
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!file) {
      setError('Please select a file to upload.')
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/ocr/process', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Server error')
      }

      const data = await response.json()
      setExtractedData(data.extractedFields)
      setSuggestedForms(data.suggestedForms)
      setIsProcessing(false)
      setIsComplete(true)
    } catch (err) {
      setError('An error occurred during processing. Please try again.')
      setIsProcessing(false)
    }
  }

  const selectForm = (formId: string) => {
    setSelectedFormId(formId)
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Automated Form Filling</h2>
      {!selectedFormId && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-10 h-10 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500">PDF, PNG, or JPG (MAX. 10MB)</p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.png,.jpg,.jpeg" />
            </label>
          </div>
          {file && (
            <div className="flex items-center space-x-2">
              <FileText className="text-blue-500" />
              <span>{file.name}</span>
            </div>
          )}
          {error && (
            <div className="text-red-500 flex items-center">
              <AlertCircle className="mr-2" size={18} />
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
            disabled={!file || isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Start Automated Filling'}
          </button>
        </form>
      )}
      {isComplete && suggestedForms.length > 0 && !selectedFormId && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Suggested Forms</h3>
          <ul className="space-y-2">
            {suggestedForms.map(form => (
              <li key={form.id} className="flex items-center justify-between p-2 bg-gray-100 rounded">
                <span>{form.name}</span>
                <button
                  onClick={() => selectForm(form.id)}
                  className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                >
                  Use This Form
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedFormId && (
        <FormEditor formId={selectedFormId} initialData={extractedData} />
      )}
    </div>
  )
}

export default AutomatedFormFilling