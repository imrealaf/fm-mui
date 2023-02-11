import React from 'react'
import {
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
  DialogTitle,
  DialogTitleProps,
  DialogContent,
  DialogContentProps,
  DialogActions,
  DialogActionsProps,
  IconButton
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

export interface DialogProps extends MuiDialogProps {
  titleProps?: DialogTitleProps
  actions?: React.ReactNode
  actionsProps?: DialogActionsProps
  contentProps?: DialogContentProps
  showClose: boolean
  onClose(): void
}

const Dialog = ({
  title,
  titleProps,
  actions,
  actionsProps,
  children,
  contentProps,
  showClose = false,
  onClose,
  ...rest
}: DialogProps) => {
  return (
    <MuiDialog onClose={onClose} {...rest}>
      {title || showClose ? (
        <DialogTitle {...titleProps}>
          {title}
          {showClose && (
            <IconButton
              onClick={onClose}
              sx={{
                position: 'absolute',
                right: title ? '10px' : '5px',
                top: title ? '10px' : '5px'
              }}
            >
              <CloseIcon></CloseIcon>
            </IconButton>
          )}
        </DialogTitle>
      ) : null}
      <DialogContent {...contentProps}>{children}</DialogContent>
      {actions && <DialogActions {...actionsProps}>{actions}</DialogActions>}
    </MuiDialog>
  )
}

export default Dialog
