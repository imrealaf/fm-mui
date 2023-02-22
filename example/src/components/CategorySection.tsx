import React from 'react'
import { Typography, Grid, Box, Skeleton } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Card, CardProps, useBreakpoint } from 'fm-mui'
import { useNavigate } from 'react-router-dom'

import InfoRow from './InfoRow'

export type CategorySectionRow = {
  label: string
  value: React.ReactNode
  path?: string
  onClick?(): void
  alignLabel?: string
  alignValue?: string
  hideArrow?: boolean
  disableHover?: boolean
}

export interface CategorySectionProps extends CardProps {
  loading?: boolean
  title: string
  rows?: CategorySectionRow[]
}

const CategorySection = ({
  title,
  rows = [],
  loading = false,
  ...rest
}: CategorySectionProps) => {
  const bp = useBreakpoint()
  const navigate = useNavigate()
  const handleClick = (row: CategorySectionRow) => {
    if (row.onClick) {
      row.onClick()
    } else if (row.path) {
      navigate(row.path)
    }
  }

  return (
    <Card {...rest} variant='outlinedElevation' contentProps={{ p: 0 }}>
      {/* <Backdrop open={loading} sx={{ position: 'absolute' }}>
        <CircularProgress />
      </Backdrop> */}
      <Box>
        <Typography
          variant='h6'
          color='primary.main'
          px={3}
          pt={2}
          pb={bp.mdAndUp ? 1 : 0}
        >
          {title}
        </Typography>

        {rows.map((row: CategorySectionRow) => (
          <InfoRow
            key={row.label}
            container
            display='flex'
            alignItems='center'
            onClick={
              row.onClick || row.path ? () => handleClick(row) : undefined
            }
            path={row.path}
            disableHover={row.disableHover}
          >
            <Grid
              item
              xs={12}
              sm={3}
              display='flex'
              alignSelf={row.alignLabel || 'center'}
            >
              <Typography variant='body2' color='grey7.main'>
                {row.label}
              </Typography>
            </Grid>
            <Grid
              display='flex'
              item
              xs={8}
              sm={row.hideArrow ? 9 : 6}
              justifyContent={bp.smAndUp ? row.alignValue || '' : ''}
            >
              {loading ? (
                <Skeleton sx={{ fontSize: '1rem', width: 270 }} />
              ) : (
                <Typography component='div' variant='body1'>
                  {row.value}
                </Typography>
              )}
            </Grid>
            {!row.hideArrow && (
              <Grid display='flex' item xs={4} sm={3} justifyContent='end'>
                <ChevronRightIcon color='grey6' />
              </Grid>
            )}
          </InfoRow>
        ))}
      </Box>
    </Card>
  )
}

export default CategorySection
