import React from 'react'
import { Box, Grid, GridProps, styled, SxProps, Theme } from '@mui/material'

import config from '../config'

export interface SplitScreenLayoutProps {
  contentLeft: React.ReactNode
  contentRight: React.ReactNode
  contentLeftProps?: GridProps
  contentRightProps?: GridProps
  hideLeft?: boolean
  hideRight?: boolean
  fullHeight?: boolean
}

const StyledSplitScreenLayout = styled(Grid)<Partial<SplitScreenLayoutProps>>(
  ({ fullHeight }) => ({
    height: fullHeight ? '100vh' : 'auto'
  })
)

const defaultContentProps: GridProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const SplitScreenLayout = ({
  fullHeight = true,
  contentLeft,
  contentRight,
  contentLeftProps,
  contentRightProps,
  hideLeft,
  hideRight
}: SplitScreenLayoutProps) => {
  return (
    <StyledSplitScreenLayout fullHeight={fullHeight} container>
      {!hideLeft && (
        <Grid
          item
          {...defaultContentProps}
          {...contentLeftProps}
          xs={hideRight ? 12 : 6}
        >
          {contentLeft}
        </Grid>
      )}
      {!hideRight && (
        <Grid
          item
          {...defaultContentProps}
          {...contentRightProps}
          xs={hideLeft ? 12 : 6}
        >
          {contentRight}
        </Grid>
      )}
    </StyledSplitScreenLayout>
  )
}

export default SplitScreenLayout
