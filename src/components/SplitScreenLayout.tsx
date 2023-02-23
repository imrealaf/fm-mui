import React from 'react'
import { Grid, GridProps, styled } from '@mui/material'

export interface SplitScreenLayoutProps {
  testId?: string
  contentLeft: React.ReactNode
  contentRight: React.ReactNode
  contentLeftProps?: GridProps
  contentRightProps?: GridProps
  hideLeft?: boolean
  hideRight?: boolean
  fullHeight?: boolean
}

const StyledSplitScreenLayout = styled(Grid, {
  shouldForwardProp: (prop) => prop !== 'fullHeight'
})<Partial<SplitScreenLayoutProps>>(({ fullHeight }) => ({
  height: fullHeight ? '100vh' : 'auto'
}))

const defaultContentProps: GridProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const SplitScreenLayout = ({
  testId = 'split-screen-layout',
  fullHeight = true,
  contentLeft,
  contentRight,
  contentLeftProps,
  contentRightProps,
  hideLeft,
  hideRight
}: SplitScreenLayoutProps) => {
  return (
    <StyledSplitScreenLayout
      data-testid={testId}
      fullHeight={fullHeight}
      container
    >
      {!hideLeft && (
        <Grid
          data-testid={`${testId}-left-content`}
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
          data-testid={`${testId}-right-content`}
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
