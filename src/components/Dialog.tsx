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
  testId?: string
  titleProps?: DialogTitleProps
  actions?: React.ReactNode
  actionsProps?: DialogActionsProps
  contentProps?: DialogContentProps
  showClose?: boolean
  onClose(): void
}

const Dialog = ({
  testId = 'dialog',
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
    <MuiDialog data-testid={testId} onClose={onClose} {...rest}>
      {title || showClose ? (
        <DialogTitle data-testid={`${testId}-title`} {...titleProps}>
          {title}
          {showClose && (
            <IconButton
              data-testid={`${testId}-close`}
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
      <DialogContent data-testid={`${testId}-content`} {...contentProps}>
        {children}
      </DialogContent>
      {actions && (
        <DialogActions data-testid={`${testId}-actions`} {...actionsProps}>
          {actions}
        </DialogActions>
      )}
    </MuiDialog>
  )
}

export default Dialog
