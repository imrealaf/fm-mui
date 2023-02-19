// import React from 'react'
// import { getFirestore } from 'firebase/firestore'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import useSettings from './useSettings'

// import { useAppDispatch, useAppSelector } from '.'
// import { dbCollections } from '../config'

const useAuth = () => {
  //   const dispatch = useAppDispatch()
  const auth = getAuth()
  const { getSettings } = useSettings()
  //   const db = getFirestore()

  const signInWithEmail = async (
    email: string,
    password: string,
    onSuccess?: () => void,
    onError?: (error: unknown) => void
  ) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      getSettings(() => {
        if (onSuccess) setTimeout(onSuccess)
      })
    } catch (error) {
      if (onError) onError(error)
    }
  }

  return { auth, signInWithEmail }
}

export default useAuth
