import React, { useEffect, useState } from 'react'

interface FormField {
  id: string
  label: string
  type: string
  value: string
}

interface FormSchema {
  id: string
  name: string
  fields: FormField[]
}

/**
 * A React functional component for rendering and managing a dynamic form editor.
 * @param {Object} props - The component props.
 * @param {string} props.formId - The unique identifier of the form to be edited.
 * @param {Record<string, string>} [props.initialData] - Optional initial data to pre-fill the form fields.
 * @returns {React.ReactElement} A React element representing the form editor UI.
 */
const FormEditor: React.FC<{ formId: string; initialData?: Record<string, string> }> = ({ formId, initialData }) => {
  const [formSchema, setFormSchema] = useState<FormSchema | null>(null)

  useEffect(() => {
    // Fetch the form schema from the backend
    fetch(`/api/forms/${formId}`)
      .then(response => response.json())
      .then(data => {
        // Pre-fill form with initialData if provided
        if (initialData) {
          data.fields = data.fields.map(field => ({
            ...field,
            value: initialData[field.id] || field.value
          }))
        }
        setFormSchema(data)
      })
      .catch(error => console.error('Error fetching form schema:', error))
  }, [formId, initialData])

  const handleChange = (fieldId: string, value: string) => {
    if (formSchema) {
      setFormSchema({
        ...formSchema,
        fields: formSchema.fields.map(field =>
          field.id === fieldId ? { ...field, value } : field
        ),
      })
    }
  }

  const handleSubmit = () => {
    // Submit the filled form data to the backend
    fetch(`/api/forms/${formId}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formSchema?.fields),
    })
      .then(response => {
        if (response.ok) {
          alert('Form submitted successfully!')
        } else {
          alert('Error submitting form.')
        }
      })
      .catch(error => console.error('Error submitting form:', error))
  }

  if (!formSchema) {
    return <div>Loading form...</div>
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">{formSchema.name}</h2>
      <form className="space-y-4">
        {formSchema.fields.map(field => (
          <div key={field.id}>
            <label className="block text-sm font-medium text-gray-700">{field.label}</label>
            <input
              type={field.type}
              value={field.value}
              onChange={e => handleChange(field.id, e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit Form
        </button>
      </form>
    </div>
  )
}

export default FormEditor