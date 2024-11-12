import React, { useState, useEffect } from 'react'
import { HelpCircle, X, ChevronRight, ChevronLeft } from 'lucide-react'

interface TutorialStep {
  title: string
  content: string
  target: string
  translation?: string
  explanation?: string
}

const formTutorialSteps: TutorialStep[] = [
  {
    title: 'Personal Information',
    content: 'Let\'s start by filling out your personal information.',
    target: '#personal-info',
    translation: 'Información Personal',
    explanation: 'This section asks for basic details about you, such as your name and address.'
  },
  {
    title: 'Full Name',
    content: 'Enter your full name as it appears on official documents.',
    target: '#full-name',
    translation: 'Nombre Completo',
    explanation: 'Include your first name, middle name (if any), and last name(s).'
  },
  {
    title: 'Date of Birth',
    content: 'Enter your date of birth in the format MM/DD/YYYY.',
    target: '#dob',
    translation: 'Fecha de Nacimiento',
    explanation: 'This is used to verify your age and identity.'
  },
  // Add more steps as needed
]

const ocrTutorialSteps: TutorialStep[] = [
  {
    title: 'Document Upload',
    content: 'Click here to upload a clear photo or scan of your document.',
    target: '#document-upload',
    explanation: 'Make sure the entire document is visible and well-lit.'
  },
  {
    title: 'Processing',
    content: 'Wait while our system reads and processes your document.',
    target: '#processing-indicator',
    explanation: 'This may take a few moments. The system is extracting information from your document.'
  },
  {
    title: 'Review Information',
    content: 'Check the extracted information for accuracy.',
    target: '#review-info',
    explanation: 'You can make corrections if needed before submitting.'
  },
  // Add more steps as needed
]

/**
 * Interactive tutorial component for form and OCR functionalities.
 * Manages the state and display of a step-by-step tutorial overlay.
 * @returns {JSX.Element} A React component that renders tutorial buttons and a modal for the interactive tutorial.
 */
const InteractiveTutorial: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [tutorialType, setTutorialType] = useState<'form' | 'ocr' | null>(null)
  const [steps, setSteps] = useState<TutorialStep[]>([])

  useEffect(() => {
    if (tutorialType === 'form') {
      setSteps(formTutorialSteps)
    } else if (tutorialType === 'ocr') {
      setSteps(ocrTutorialSteps)
    }
  }, [tutorialType])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsOpen(false)
      setCurrentStep(0)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setCurrentStep(0)
    setTutorialType(null)
  }

  const startTutorial = (type: 'form' | 'ocr') => {
    setTutorialType(type)
    setIsOpen(true)
    setCurrentStep(0)
  }

  return (
    <>
      <div className="fixed bottom-4 right-4 flex flex-col space-y-2">
        <button
          onClick={() => startTutorial('form')}
          className="bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Start Form Tutorial"
        >
          <HelpCircle size={24} />
          <span className="sr-only">Form Help</span>
        </button>
        <button
          onClick={() => startTutorial('ocr')}
          className="bg-green-500 text-white p-2 rounded-full shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          aria-label="Start OCR Tutorial"
        >
          <HelpCircle size={24} />
          <span className="sr-only">OCR Help</span>
        </button>
      </div>
      {isOpen && steps.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{steps[currentStep].title}</h3>
              <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <p className="mb-4">{steps[currentStep].content}</p>
            {steps[currentStep].translation && (
              <p className="mb-4 text-green-600">Translation: {steps[currentStep].translation}</p>
            )}
            {steps[currentStep].explanation && (
              <p className="mb-4 text-gray-600 text-sm">{steps[currentStep].explanation}</p>
            )}
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevious}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                disabled={currentStep === 0}
              >
                <ChevronLeft size={20} />
                Previous
              </button>
              <span className="text-sm text-gray-500">
                Step {currentStep + 1} of {steps.length}
              </span>
              <button
                onClick={handleNext}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default InteractiveTutorial