import React, { useEffect, useState } from 'react'
import { Download } from 'lucide-react'

interface Form {
  id: string
  name: string
  description: string
  fileUrl: string
}

const FormLibrary: React.FC = () => {
  const [forms, setForms] = useState<Form[]>([])

  useEffect(() => {
    // Fetch the list of forms from the backend API
    fetch('/api/forms')
      .then(response => response.json())
      .then(data => setForms(data))
      .catch(error => console.error('Error fetching forms:', error))
  }, [])

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Form Library</h2>
      <ul className="space-y-4">
        {forms.map(form => (
          <li key={form.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-semibold">{form.name}</h3>
              <p className="text-sm text-gray-600">{form.description}</p>
            </div>
            <a
              href={form.fileUrl}
              download
              className="flex items-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              <Download className="mr-2" size={18} />
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FormLibrary