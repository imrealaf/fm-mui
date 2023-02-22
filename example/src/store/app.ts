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
  editMode: boolean
  redirect: boolean
}

const initialState: AppState = {
  snackbar: {
    open: false,
    message: '',
    status: undefined
  },
  pending: false,
  editMode: false,
  redirect: false
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
    },
    setEditMode: (state, action: PayloadAction<boolean>) => {
      state.editMode = action.payload
    },
    setRedirect: (state, action: PayloadAction<boolean>) => {
      state.redirect = action.payload
    }
  }
})

export const { setSnackbar, setPending, setEditMode, setRedirect } =
  appSlice.actions

export const selectSnackbar = (state: RootState) => state.app.snackbar
export const selectPending = (state: RootState) => state.app.pending
export const selectEditMode = (state: RootState) => state.app.editMode
export const selectRedirect = (state: RootState) => state.app.redirect

export default appSlice.reducer
