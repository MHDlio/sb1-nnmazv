import React, { useState } from 'react'
import { Save, FileText, Plus } from 'lucide-react'

/**
 * React functional component that renders a template editor interface.
 * This component allows users to select, edit, and save document templates.
 * It displays a list of available templates and provides an editing area
 * for the selected template.
 * 
 * @returns {JSX.Element} A React element representing the template editor interface
 */
const TemplateEditor: React.FC = () => {
  const [templates, setTemplates] = useState([
    { id: 1, name: 'Visa Application Cover Letter' },
    { id: 2, name: 'Business License Renewal Request' },
    { id: 3, name: 'Tax Filing Extension Letter' },
  ])
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const [content, setContent] = useState('')

  const handleTemplateSelect = (id: number) => {
    setSelectedTemplate(id)
    // In a real application, you would fetch the template content here
    setContent('This is the content of the selected template. Edit as needed.')
  }

  const handleSave = () => {
    // In a real application, you would save the template content here
    console.log('Saving template:', content)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Template Editor</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Templates</h2>
          <ul className="space-y-2">
            {templates.map((template) => (
              <li
                key={template.id}
                className={`flex items-center p-2 rounded cursor-pointer ${
                  selectedTemplate === template.id ? 'bg-blue-100' : 'hover:bg-gray-100'
                }`}
                onClick={() => handleTemplateSelect(template.id)}
              >
                <FileText className="mr-2 text-gray-500" size={18} />
                {template.name}
              </li>
            ))}
          </ul>
          <button className="mt-4 flex items-center text-blue-500 hover:text-blue-600">
            <Plus className="mr-1" size={18} />
            Add New Template
          </button>
        </div>
        <div className="md:col-span-2 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Edit Template</h2>
          {selectedTemplate ? (
            <>
              <textarea
                className="w-full h-64 p-2 border rounded mb-4"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
              <button
                onClick={handleSave}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 flex items-center"
              >
                <Save className="mr-2" size={18} />
                Save Template
              </button>
            </>
          ) : (
            <p className="text-gray-500">Select a template to edit or create a new one.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default TemplateEditor