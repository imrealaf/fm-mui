import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'firebase/auth'

import { storageKey } from '../config'
import { RootState } from '.'

const settingsKey = `${storageKey}/settings`

export const sanitizeUserData = (user: User) => {
  const {
    uid,
    email,
    emailVerified,
    displayName,
    photoURL,
    metadata,
    providerData
  } = user
  const data = {
    uid,
    email,
    emailVerified,
    displayName,
    photoURL,
    metadata: { ...metadata },
    providerData
  } as User
  return data
}

export interface AppState {
  user: User | null
  profile: Record<string, any> | null
  settings: Record<string, any> | null
}

const initialState: AppState = {
  user: null,
  profile: null,
  settings: sessionStorage.getItem(settingsKey)
    ? JSON.parse(sessionStorage.getItem(settingsKey) || '')
    : null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
    },
    setProfile: (state, action: PayloadAction<Record<string, any> | null>) => {
      state.profile = action.payload
    },
    setSettings: (state, action: PayloadAction<Record<string, any> | null>) => {
      state.settings = action.payload
      if (state.settings) {
        sessionStorage.setItem(settingsKey, JSON.stringify(state.settings))
      } else {
        sessionStorage.removeItem(settingsKey)
      }
    }
  }
})

export const { setUser, setProfile, setSettings } = userSlice.actions

export const selectUser = (state: RootState) => state.user.user
export const selectProfile = (state: RootState) => state.user.profile
export const selectSettings = (state: RootState) => state.user.settings

export default userSlice.reducer
