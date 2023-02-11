import React from 'react'

/**
 * useToggleByAnchor
 * @description utility for controlling visibility of components that are bound by an anchor element
 */

export interface UseToggleByAnchorApi {
  anchorEl: null | HTMLElement
  open: boolean
  show(event: React.MouseEvent<HTMLElement>): void
  hide(): void
}

function useToggleByAnchor(): UseToggleByAnchorApi {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const show = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const hide = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return {
    anchorEl,
    open,
    show,
    hide
  }
}

export default useToggleByAnchor
