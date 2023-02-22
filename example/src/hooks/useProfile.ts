import { User } from 'firebase/auth'
import moment from 'moment'

import { dbCollections } from 'config'
import { useAppDispatch, useAppSelector, useDb } from '.'
import {
  selectUser,
  selectProfile,
  setProfile as setProfileState
} from 'store/user'
import { BirthdayMap } from 'types'

const initialProfileState = {
  firstName: '',
  lastName: '',
  birthday: '',
  gender: ''
}

function useProfile() {
  const dispatch = useAppDispatch()
  const profile = useAppSelector(selectProfile)
  const user = useAppSelector(selectUser)
  const { getDoc, updateDoc, setDoc } = useDb()

  const getProfile = async (authUser?: User) => {
    if (!user) return
    const uid = authUser ? authUser.uid : user?.uid
    try {
      console.log('fdfds')
      const doc = (await getDoc(dbCollections.profile, uid)) as Record<
        string,
        any
      >
      dispatch(setProfileState(doc))
      return doc
    } catch (error) {
      return error
    }
  }

  const createProfile = async (
    authUser?: User,
    data: Record<string, any> = {}
  ) => {
    if (!authUser || !user) return
    const uid = authUser ? authUser.uid : user?.uid
    try {
      await setDoc(
        dbCollections.profile,
        { ...initialProfileState, ...data },
        uid
      )
      return true
    } catch (error) {
      return error
    }
  }

  const updateProfile = async (data: any) => {
    if (!user) return

    const newData = {
      ...profile,
      ...data
    }

    try {
      await updateDoc(dbCollections.profile, user.uid, newData)
      dispatch(setProfileState(newData))
      return true
    } catch (error) {
      console.log(error)
      return error
    }
  }

  const setProfile = (data: any) => {
    dispatch(
      setProfileState({
        ...profile,
        ...data
      })
    )
  }

  const getBirthdayMap = (): BirthdayMap => {
    const birthday = profile?.birthday || ''
    const parts = birthday.split('-')
    return {
      month: parts[1],
      day: parts[2],
      year: parts[0]
    }
  }

  const getAge = () => {
    if (profile?.birthday) {
      const birthYear = parseInt(moment(profile?.birthday).format('YYYY'))
      const currYear = parseInt(moment().format('YYYY'))
      return `${currYear - birthYear}`
    } else {
      return ''
    }
  }

  return {
    profile,
    getProfile,
    createProfile,
    setProfile,
    updateProfile,
    birthdayMap: getBirthdayMap(),
    birthdayFormatted: profile?.birthday
      ? moment(profile?.birthday).format('MMMM D, YYYY')
      : '',
    age: getAge()
  }
}

export default useProfile
