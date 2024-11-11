// components/FormLibrary.tsx
import React, { useEffect, useState } from 'react'
import { Download, Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface Form {
  id: string
  name: string
  description: string
  fileUrl: string
  category: string
  tags: string[]
}

const FormLibrary: React.FC = () => {
  const { t } = useTranslation()
  const [forms, setForms] = useState<Form[]>([])
  const [filteredForms, setFilteredForms] = useState<Form[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [tags, setTags] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch('/api/forms')
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setForms(data)
        setFilteredForms(data)
        const uniqueCategories = Array.from(new Set(data.map((form: Form) => form.category)))
        setCategories(uniqueCategories)
        const uniqueTags = Array.from(new Set(data.flatMap((form: Form) => form.tags)))
        setTags(uniqueTags)
      } catch (error) {
        console.error('Error fetching forms:', error)
        setError(t('formLibrary.errorFetching'))
      } finally {
        setIsLoading(false)
      }
    }
    fetchForms()
  }, [t])

  useEffect(() => {
    let filtered = forms
    if (searchTerm) {
      filtered = filtered.filter((form) =>
        form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    if (selectedCategory) {
      filtered = filtered.filter((form) => form.category === selectedCategory)
    }
    if (selectedTags.length > 0) {
      filtered = filtered.filter((form) => 
        selectedTags.every((tag) => form.tags.includes(tag))
      )
    }
    setFilteredForms(filtered)
  }, [forms, searchTerm, selectedCategory, selectedTags])

  if (isLoading) {
    return <div>{t('formLibrary.loading')}</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">{t('formLibrary.title')}</h2>
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder={t('formLibrary.searchPlaceholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-2 border rounded"
          aria-label={t('formLibrary.searchPlaceholder')}
        />
        <Search className="ml-2 text-gray-500" aria-hidden="true" />
      </div>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setSelectedCategory('')}
          className={`px-3 py-1 rounded ${
            selectedCategory === '' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          aria-pressed={selectedCategory === ''}
        >
          {t('formLibrary.allCategories')}
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 rounded ${
              selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            aria-pressed={selectedCategory === category}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTags(prev => 
              prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
            )}
            className={`px-2 py-1 text-sm rounded ${
              selectedTags.includes(tag) ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            aria-pressed={selectedTags.includes(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <ul role="list" className="space-y-4">
        {filteredForms.map((form) => (
          <li
            key={form.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <h3 className="font-semibold">{form.name}</h3>
              <p className="text-sm text-gray-600">{form.description}</p>
              <p className="text-xs text-gray-500">{form.category}</p>
              <div className="mt-1">
                {form.tags.map((tag) => (
                  <span key={tag} className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-1 mb-1">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <a
              href={form.fileUrl}
              download
              className="flex items-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label={`${t('formLibrary.download')} ${form.name}`}
            >
              <Download className="mr-2" size={18} aria-hidden="true" />
              {t('formLibrary.download')}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FormLibrary
