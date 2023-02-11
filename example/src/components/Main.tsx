import React from 'react'
import { Container } from '@mui/material'
import { ResponsiveMain } from 'fm-mui'

interface MainProps {
  children: React.ReactNode
}

const Main = ({ children }: MainProps) => {
  return (
    <ResponsiveMain>
      <Container>{children}</Container>
    </ResponsiveMain>
  )
}

export default Main
