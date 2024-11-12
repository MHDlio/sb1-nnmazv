import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Step {
  id: number
  title: string
  description: string
}

interface ProcessState {
  steps: Step[]
  currentStep: number
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: ProcessState = {
  steps: [],
  currentStep: 1,
  status: 'idle',
  error: null,
}

/**
 * Fetches steps for a process asynchronously.
 * @returns {Promise<Step[]>} A promise that resolves to an array of Step objects.
 * Each Step object contains id, title, and description properties.
 */
export const fetchSteps = createAsyncThunk('process/fetchSteps', async () => {
  // In a real app, this would be an API call
  const response = await new Promise<Step[]>((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: 'Document Collection', description: 'Gather all necessary documents' },
        { id: 2, title: 'Form Filling', description: 'Complete required application forms' },
        { id: 3, title: 'Review & Submission', description: 'Review all information and submit application' },
        { id: 4, title: 'Follow-up', description: 'Track application status and respond to queries' },
      ])
    }, 1000)
  })
  return response
})

const processSlice = createSlice({
  name: 'process',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSteps.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchSteps.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.steps = action.payload
      })
      .addCase(fetchSteps.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch steps'
      })
  },
})

export const { setCurrentStep } = processSlice.actions
export default processSlice.reducer