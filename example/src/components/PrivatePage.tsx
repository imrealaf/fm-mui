import React from 'react'
import { Container, ContainerProps } from '@mui/material'

export interface PrivatePageProps extends Partial<ContainerProps> {
  pageTitle?: React.ReactNode
}

const PrivatePage = ({ pageTitle, children, ...rest }: PrivatePageProps) => {
  return (
    <>
      {pageTitle && pageTitle}
      <Container {...rest} sx={{ py: 3, px: 3 }}>
        {children}
      </Container>
    </>
  )
}

export default PrivatePage
