import React from 'react'
import { Typography, IconButton, Box } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

import UnstyledRouterLink from './UnstyledRouterLink'
import CategorySection, { CategorySectionProps } from './CategorySection'

export interface CategorySectionsProps {
  showBackBtn?: boolean
  backPath?: string
  items: CategorySectionProps[]
  title?: string
  loading?: boolean
}

const CategorySections = ({
  items = [],
  showBackBtn = true,
  backPath = '/',
  title = 'Back',
  loading = true
}: CategorySectionsProps) => {
  return (
    <>
      <Box
        display='flex'
        sx={{
          mb: {
            xs: 1,
            md: 2
          }
        }}
        alignItems='center'
      >
        {showBackBtn && (
          <UnstyledRouterLink to={backPath}>
            <IconButton>
              <ChevronLeftIcon />
            </IconButton>
          </UnstyledRouterLink>
        )}

        {title && showBackBtn && <Typography variant='h6'>{title}</Typography>}
      </Box>
      {items.map((section, index) => (
        <CategorySection
          key={section.title}
          {...section}
          loading={loading}
          sx={{ mt: index > 0 ? 3 : 0 }}
        />
      ))}
    </>
  )
}

export default CategorySections
