// import React from 'react'
// import { getFirestore } from 'firebase/firestore'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signOut as firebaseSignOut,
  AuthError
} from 'firebase/auth'
import useProfile from './useProfile'
import useSettings from './useSettings'

// import { useAppDispatch, useAppSelector } from '.'
// import { dbCollections } from '../config'

const useAuth = () => {
  //   const dispatch = useAppDispatch()
  const auth = getAuth()
  const { getSettings, createSettings } = useSettings()
  const { createProfile } = useProfile()
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

  const userNotExists = async (email: string) => {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email)
      if (signInMethods.length === 0) {
        return true
      } else {
        return Promise.reject({
          code: 'sign-up/user-already-exist',
          message: `An account already exists with email ${email}`
        } as AuthError)
      }
    } catch (error) {
      return error as AuthError
    }
  }

  const createUserWithEmail = async (
    email: string,
    password: string,
    firstName: string
  ) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      await updateProfile(user, {
        displayName: firstName
      })
      await createProfile(user, {
        firstName
      })
      await createSettings(user)
      return user
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
      const { code, message } = error as AuthError
      let msg = message
      switch (code) {
        case 'auth/wrong-password':
          msg = 'The password you entered is incorrect'
          break
      }
      return Promise.reject({
        code,
        message: msg
      } as AuthError)
    }
  }

  const signOut = async () => {
    try {
      await firebaseSignOut(auth)
      return true
    } catch (error) {
      return Promise.reject(error as AuthError)
    }
  }

  return {
    auth,
    userExists,
    userNotExists,
    signInWithEmail,
    signOut,
    createUserWithEmail
  }
}

export default useAuth
