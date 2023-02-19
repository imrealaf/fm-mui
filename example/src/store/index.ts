import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import app from './app'
import user from './user'

const store = configureStore({
  reducer: {
    app,
    user
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export default store
