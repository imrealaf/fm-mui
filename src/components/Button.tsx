import React from 'react'
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  styled
} from '@mui/material'

export interface ButtonProps extends MuiButtonProps {
  testId?: string
  pill?: boolean
}

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== 'pill'
})<ButtonProps>(({ pill }) => ({
  ...(pill && {
    borderRadius: 30
  })
}))

const Button = ({
  testId = 'button',
  pill = false,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <StyledButton data-testid={testId} pill={pill} {...rest}>
      {children}
    </StyledButton>
  )
}

export default Button
