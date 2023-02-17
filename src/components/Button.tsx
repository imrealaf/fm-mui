import React from 'react'
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  styled
} from '@mui/material'

export interface ButtonProps extends MuiButtonProps {
  pill?: boolean
}

const StyledButton = styled(MuiButton)<ButtonProps>(({ pill }) => ({
  ...(pill && {
    borderRadius: 30
  })
}))

const Button = ({ pill = false, children, ...rest }: ButtonProps) => {
  return (
    <StyledButton pill={pill} {...rest}>
      {children}
    </StyledButton>
  )
}

export default Button
