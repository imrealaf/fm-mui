import { dbCollections } from '../config'
import { useAppDispatch, useAppSelector, useDb } from '.'
import {
  selectUser,
  selectSettings,
  setSettings as setSettingsState
} from '../store/user'

const initialSettingsState = {
  darkMode: false
}

function useSettings() {
  const dispatch = useAppDispatch()
  const settings = useAppSelector(selectSettings)
  const user = useAppSelector(selectUser)
  const { getDoc, updateDoc, setDoc } = useDb()

  const getSettings = async (
    onSuccess?: () => void,
    onError?: (error: unknown) => void
  ) => {
    if (!user) return

    try {
      const doc = (await getDoc(dbCollections.settings, user.uid)) as Record<
        string,
        any
      >
      dispatch(setSettingsState(doc))
      if (onSuccess) onSuccess()
    } catch (error) {
      console.log(error)
      if (onError) onError(error)
    }
  }

  const createSettings = async (
    onSuccess?: () => void,
    onError?: (error: unknown) => void
  ) => {
    if (!user) return
    try {
      await setDoc(dbCollections.settings, initialSettingsState, user.uid)
      if (onSuccess) onSuccess()
    } catch (error) {
      console.log(error)
      if (onError) onError(error)
    }
  }

  const updateSettings = async (
    data: any,
    onSuccess?: () => void,
    onError?: (error: unknown) => void
  ) => {
    if (!user) return

    const newData = {
      ...settings,
      ...data
    }

    try {
      await updateDoc(dbCollections.settings, user.uid, newData)
      dispatch(setSettingsState(newData))
      if (onSuccess) onSuccess()
    } catch (error) {
      console.log(error)
      if (onError) onError(error)
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
