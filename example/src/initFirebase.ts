import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getStorage, connectStorageEmulator } from 'firebase/storage'
import { Dispatch, AnyAction } from '@reduxjs/toolkit'

import { logDev } from './utils'
import { setUser, setProfile, setSettings } from './store/user'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MSG_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
}

initializeApp(firebaseConfig)

if (process.env.NODE_ENV !== 'production') {
  connectAuthEmulator(
    getAuth(),
    `http://localhost:${process.env.REACT_APP_AUTH_EMULATOR_PORT || 9099}`
  )
  connectFirestoreEmulator(
    getFirestore(),
    'localhost',
    process.env.REACT_APP_FIRESTORE_EMULATOR_PORT
      ? parseInt(process.env.REACT_APP_FIRESTORE_EMULATOR_PORT)
      : 8080
  )
  connectStorageEmulator(
    getStorage(),
    'localhost',
    process.env.REACT_APP_STORAGE_EMULATOR_PORT
      ? parseInt(process.env.REACT_APP_STORAGE_EMULATOR_PORT)
      : 9199
  )
}

export const onAuthStateChanged = (
  dispatch: Dispatch<AnyAction>,
  callback?: () => void
) => {
  getAuth().onAuthStateChanged((user) => {
    dispatch(setUser(user))

    if (!user) {
      dispatch(setProfile(null))
      dispatch(setSettings(null))
    }

    logDev(user, 'Current User')

    if (callback) {
      callback()
    }
  })
}
