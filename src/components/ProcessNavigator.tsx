// components/ProcessNavigator.tsx
import React, { useEffect, useState, useReducer, useCallback } from 'react'
import { ChevronRight, CheckCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import FormLibrary from './FormLibrary'
import FormEditor from './FormEditor'
import AutomatedFormFilling from './AutomatedFormFilling'

interface Step {
  id: number
  title: string
  description: string
  component: React.ReactNode
}

type Action =
  | { type: 'SET_STEPS'; steps: Step[] }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SET_SELECTED_FORM'; formId: string }

interface State {
  steps: Step[]
  currentStep: number
  selectedFormId: string | null
}

const initialState: State = {
  steps: [],
  currentStep: 1,
  selectedFormId: null,
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_STEPS':
      return { ...state, steps: action.steps }
    case 'NEXT_STEP':
      return { ...state, currentStep: Math.min(state.currentStep + 1, state.steps.length) }
    case 'PREV_STEP':
      return { ...state, currentStep: Math.max(state.currentStep - 1, 1) }
    case 'SET_SELECTED_FORM':
      return { ...state, selectedFormId: action.formId, currentStep: state.currentStep + 1 }
    default:
      return state
  }
}

const ProcessNavigator: React.FC = () => {
  const { t } = useTranslation()
  const [state, dispatch] = useReducer(reducer, initialState)
  const { steps, currentStep, selectedFormId } = state

  const fetchSteps = useCallback(async () => {
    try {
      const response = await fetch('/api/processes/1')
      if (!response.ok) {
        throw new Error('Failed to fetch process steps')
      }
      const data = await response.json()
      const stepsData = data.steps.map((step: any, index: number) => ({
        id: index + 1,
        title: step.title,
        description: step.description,
        component: getStepComponent(step.id),
      }))
      dispatch({ type: 'SET_STEPS', steps: stepsData })
    } catch (error) {
      console.error('Error fetching steps:', error)
      // TODO: Add error state and display error message to user
    }
  }, [])

  useEffect(() => {
    fetchSteps()
  }, [fetchSteps])

  const getStepComponent = (stepId: number): React.ReactNode => {
    switch (stepId) {
      case 1:
        return <FormLibrary onSelectForm={handleFormSelection} />
      case 2:
        return selectedFormId ? (
          <FormEditor formId={selectedFormId} />
        ) : (
          <AutomatedFormFilling onFormSelected={handleFormSelection} />
        )
      case 3:
        return <div>{t('processNavigator.reviewSubmit')}</div>
      default:
        return <div>{t('processNavigator.stepNotFound')}</div>
    }
  }

  const handleFormSelection = (formId: string) => {
    dispatch({ type: 'SET_SELECTED_FORM', formId })
  }

  const handleStepChange = (direction: 'next' | 'prev') => {
    dispatch({ type: direction === 'next' ? 'NEXT_STEP' : 'PREV_STEP' })
  }

  if (steps.length === 0) {
    return <div>{t('processNavigator.loading')}</div>
  }

  const currentComponent = steps[currentStep - 1]?.component || (
    <div>{t('processNavigator.componentNotFound')}</div>
  )

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">{t('processNavigator.title')}</h1>
      <div className="bg-white shadow rounded-lg p-6" role="region" aria-label={t('processNavigator.processTitle')}>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">{t('processNavigator.processTitle')}</h2>
          <p className="text-gray-600">{t('processNavigator.processDescription')}</p>
        </div>
        <div className="space-y-4" role="list">
          {steps.map((step) => (
            <StepItem
              key={step.id}
              step={step}
              isActive={step.id === currentStep}
              isCompleted={step.id < currentStep}
            />
          ))}
        </div>
        <div className="mt-8">{currentComponent}</div>
        <div className="mt-8 flex justify-between">
          <button
            onClick={() => handleStepChange('prev')}
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50"
            disabled={currentStep === 1}
            aria-label={t('processNavigator.previous')}
          >
            {t('processNavigator.previous')}
          </button>
          <button
            onClick={() => handleStepChange('next')}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
            disabled={currentStep === steps.length}
            aria-label={t('processNavigator.next')}
          >
            {t('processNavigator.next')}
          </button>
        </div>
      </div>
    </div>
  )
}

interface StepItemProps {
  step: Step
  isActive: boolean
  isCompleted: boolean
}

const StepItem: React.FC<StepItemProps> = ({ step, isActive, isCompleted }) => {
  return (
    <div
      className={`flex items-center p-4 ${
        isActive ? 'bg-blue-100' : 'bg-gray-100'
      } rounded-lg`}
      role="listitem"
      aria-current={isActive ? 'step' : undefined}
    >
      <div
        className={`mr-4 ${isActive ? 'text-blue-500' : 'text-gray-400'}`}
        aria-hidden="true"
      >
        {isCompleted ? (
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
      {isActive && <ChevronRight className="text-blue-500" aria-hidden="true" />}
    </div>
  )
}

export default React.memo(ProcessNavigator)
