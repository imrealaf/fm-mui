import { useAppSelector, useAppDispatch } from 'hooks'
import {
  selectPending,
  setPending as setPendingState,
  selectSnackbar,
  setSnackbar as setSnackbarState,
  selectEditMode,
  setEditMode as setEditModeState,
  selectRedirect,
  setRedirect as setRedirectState
} from 'store/app'

function useApp() {
  const dispatch = useAppDispatch()
  const pending = useAppSelector(selectPending)
  const snackbar = useAppSelector(selectSnackbar)
  const editMode = useAppSelector(selectEditMode)
  const redirect = useAppSelector(selectRedirect)

  const setPending = (value: boolean) => {
    dispatch(setPendingState(value))
  }

  const setEditMode = (value: boolean) => {
    dispatch(setEditModeState(value))
  }

  const setRedirect = (value: boolean) => {
    dispatch(setRedirectState(value))
  }

  const showSnackbar = (message: string) => {
    dispatch(
      setSnackbarState({
        open: true,
        message
      })
    )
  }

  const hideSnackbar = () => {
    dispatch(
      setSnackbarState({
        open: false,
        message: ''
      })
    )
  }

  return {
    pending,
    setPending,
    editMode,
    setEditMode,
    redirect,
    setRedirect,
    snackbar: {
      ...snackbar,
      show: showSnackbar,
      hide: hideSnackbar
    }
  }
}

export default useApp
