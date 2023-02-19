// import React from 'react'
// import { getFirestore } from 'firebase/firestore'
import {
  getAuth,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signOut as firebaseSignOut,
  AuthError
} from 'firebase/auth'
import useSettings from './useSettings'

// import { useAppDispatch, useAppSelector } from '.'
// import { dbCollections } from '../config'

const useAuth = () => {
  //   const dispatch = useAppDispatch()
  const auth = getAuth()
  const { getSettings } = useSettings()
  //   const db = getFirestore()

  const userExists = async (email: string) => {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email)
      if (signInMethods.length > 0) {
        return true
      } else {
        return Promise.reject({
          code: 'auth/user-doesnt-exist',
          message: `We couldn't find an account with email ${email}`
        } as AuthError)
      }
    } catch (error) {
      return error as AuthError
    }
  }

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      await getSettings(user)
      return user
    } catch (error) {
      return error as AuthError
    }
  }

  const signOut = async () => {
    try {
      await firebaseSignOut(auth)
      return true
    } catch (error) {
      return error as AuthError
    }
  }

  return { auth, userExists, signInWithEmail, signOut }
}

export default useAuth
