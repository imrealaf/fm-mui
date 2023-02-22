import * as paths from 'routes/paths'
import { Gender } from 'types'

export const storageKey = process.env.REACT_APP_FIREBASE_PROJECT_ID

export const dbCollections = {
  profile: 'users',
  settings: 'settings'
}

export const passwordConfig = {
  minLength: 8,
  containsNumbers: true
}

export const signInRedirect = paths.DASHBOARD_ROUTE
export const signUpRedirect = paths.DASHBOARD_ROUTE

export const account = {
  genderOptions: ['Male', 'Female', 'Rather not say'] as Gender[]
}
