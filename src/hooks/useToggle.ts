import { useState } from 'react'

/**
 * useToggle
 * @description utility for controlling visibility of components
 */

export interface UseToggleApi {
  open: boolean
  show(): void
  hide(): void
  toggle(): void
}

function useToggle(initialState: boolean = false): UseToggleApi {
  const [open, setOpen] = useState(initialState)
  const show = () => setOpen(true)
  const hide = () => setOpen(false)
  const toggle = () => setOpen((prev) => !prev)

  return {
    open,
    show,
    hide,
    toggle
  }
}

export default useToggle
