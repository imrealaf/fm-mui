import { User } from 'firebase/auth'
import { dbCollections } from 'config'
import { useAppDispatch, useAppSelector, useDb } from '.'
import {
  selectUser,
  selectSettings,
  setSettings as setSettingsState
} from 'store/user'

const initialSettingsState = {
  darkMode: false
}

function useSettings() {
  const dispatch = useAppDispatch()
  const settings = useAppSelector(selectSettings)
  const user = useAppSelector(selectUser)
  const { getDoc, updateDoc, setDoc } = useDb()

  const getSettings = async (authUser?: User) => {
    if (!authUser || !user) return
    const uid = authUser ? authUser.uid : user?.uid
    try {
      const doc = (await getDoc(dbCollections.settings, uid)) as Record<
        string,
        any
      >
      dispatch(setSettingsState(doc))
      return doc
    } catch (error) {
      return error
    }
  }

  const createSettings = async (authUser?: User) => {
    if (!authUser || !user) return
    const uid = authUser ? authUser.uid : user?.uid
    try {
      await setDoc(dbCollections.settings, initialSettingsState, uid)
      return true
    } catch (error) {
      return error
    }
  }

  const updateSettings = async (data: any) => {
    if (!user) return

    const newData = {
      ...settings,
      ...data
    }

    try {
      await updateDoc(dbCollections.settings, user.uid, newData)
      dispatch(setSettingsState(newData))
      return true
    } catch (error) {
      console.log(error)
      return error
    }
  }

  const setSettings = (data: any) => {
    dispatch(
      setSettingsState({
        ...settings,
        ...data
      })
    )
  }

  return {
    settings,
    getSettings,
    createSettings,
    setSettings,
    updateSettings
  }
}

export default useSettings
