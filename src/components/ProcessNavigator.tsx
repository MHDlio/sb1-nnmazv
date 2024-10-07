import React, { useEffect, useState } from 'react'
import { ChevronRight, CheckCircle } from 'lucide-react'
import FormLibrary from './FormLibrary'
import FormEditor from './FormEditor'
import AutomatedFormFilling from './AutomatedFormFilling'

interface Step {
  id: number
  title: string
  description: string
  component: React.ReactNode
}

const ProcessNavigator: React.FC = () => {
  const [steps, setSteps] = useState<Step[]>([])
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null)

  useEffect(() => {
    // Fetch steps from an API in a real application
    setSteps([
      {
        id: 1,
        title: 'Select Form',
        description: 'Choose a form from our library or upload a document',
        component: <FormLibrary onSelectForm={handleFormSelection} />
      },
      {
        id: 2,
        title: 'Fill Form',
        description: 'Complete the selected form or use OCR to auto-fill',
        component: selectedFormId ? (
          <FormEditor formId={selectedFormId} />
        ) : (
          <AutomatedFormFilling onFormSelected={handleFormSelection} />
        )
      },
      {
        id: 3,
        title: 'Review & Submit',
        description: 'Review your form and submit',
        component: <div>Review and submit component</div>
      }
    ])
  }, [selectedFormId])

  const handleFormSelection = (formId: string) => {
    setSelectedFormId(formId)
    setCurrentStep(currentStep + 1)
  }

  const handleStepChange = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else if (direction === 'prev' && currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Process Navigator</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Form Submission Process</h2>
          <p className="text-gray-600">Follow these steps to complete your form submission:</p>
        </div>
        <div className="space-y-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex items-center p-4 ${
                step.id === currentStep ? 'bg-blue-100' : 'bg-gray-100'
              } rounded-lg`}
            >
              <div className={`mr-4 ${step.id === currentStep ? 'text-blue-500' : 'text-gray-400'}`}>
                {step.id < currentStep ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center">
                    {step.id}
                  </div>
                )}
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
              {step.id === currentStep && <ChevronRight className="text-blue-500" />}
            </div>
          ))}
        </div>
        <div className="mt-8">
          {steps[currentStep - 1]?.component}
        </div>
        <div className="mt-8 flex justify-between">
          <button
            onClick={() => handleStepChange('prev')}
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            disabled={currentStep === 1}
          >
            Previous
          </button>
          <button
            onClick={() => handleStepChange('next')}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={currentStep === steps.length}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProcessNavigator