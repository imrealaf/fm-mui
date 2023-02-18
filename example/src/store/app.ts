import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '.'

export interface SnackbarData {
  open: boolean
  message: string
  status?: string | undefined
}

export interface AppState {
  snackbar: SnackbarData
  pending: boolean
}

const initialState: AppState = {
  snackbar: {
    open: false,
    message: '',
    status: undefined
  },
  pending: false
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setSnackbar: (state, action: PayloadAction<SnackbarData>) => {
      state.snackbar = action.payload
    },
    setPending: (state, action: PayloadAction<boolean>) => {
      state.pending = action.payload
    }
  }
})

export const { setSnackbar, setPending } = appSlice.actions

export const selectSnackbar = (state: RootState) => state.app.snackbar
export const selectPending = (state: RootState) => state.app.pending

export default appSlice.reducer
