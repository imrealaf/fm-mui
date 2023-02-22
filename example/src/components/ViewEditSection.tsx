import React, { useEffect } from 'react'
import { Box, Typography, IconButton, Breadcrumbs } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import EditIcon from '@mui/icons-material/Edit'
import { Button, Card } from 'fm-mui'

import UnstyledRouterLink from './UnstyledRouterLink'
import { useApp } from 'hooks'

interface ViewEditSectionProps {
  title: string
  backPath: string
  rootTitle?: string
  disabled: boolean
  submitBtnText?: string
  cancelBtnText?: string
  showCancel?: boolean
  editOnly?: boolean
  prependContent?: React.ReactNode
  appendContent?: React.ReactNode
  onCancel?(): void
  onEdit?(): void
  onSubmit(): void
  editActions?: React.ReactNode
  children: React.ReactNode
}

function AccountSubcategoryPage({
  title,
  rootTitle,
  backPath = '/account',
  submitBtnText,
  cancelBtnText,
  showCancel = true,
  editOnly = false,
  disabled,
  onEdit,
  onCancel,
  onSubmit,
  editActions,
  prependContent,
  appendContent,
  children
}: ViewEditSectionProps) {
  const { editMode, setEditMode } = useApp()

  const handleEditClick = () => {
    setEditMode(true)
    if (onEdit) onEdit()
  }

  const handleCancelClick = () => {
    setEditMode(false)
    if (onCancel) onCancel()
  }

  useEffect(() => {
    if (editOnly) {
      setEditMode(true)
    }

    return () => {
      setEditMode(false)
    }
  }, [])

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
        <UnstyledRouterLink to={backPath}>
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
        </UnstyledRouterLink>

        <Breadcrumbs aria-label='breadcrumb'>
          {rootTitle && (
            <Typography variant='h6' color='text.secondary'>
              {rootTitle}
            </Typography>
          )}
          {title && (
            <Typography variant='h6' color='text.primary'>
              {title}
            </Typography>
          )}
        </Breadcrumbs>
      </Box>
      {prependContent && prependContent}
      <Card variant='outlinedElevation' contentProps={{ p: 3 }}>
        {children}
        <Box display='flex' justifyContent='end' pt={2}>
          {!editMode ? (
            <>
              {editActions && editActions}
              <Button pill variant='outlined' onClick={handleEditClick}>
                <EditIcon sx={{ fontSize: '14px' }} /> Edit
              </Button>
            </>
          ) : (
            <>
              {showCancel && (
                <Button
                  pill
                  variant='text'
                  color='grey6'
                  onClick={handleCancelClick}
                  sx={{ mr: 1 }}
                >
                  {cancelBtnText || 'Cancel'}
                </Button>
              )}
              <Button pill disabled={disabled} onClick={onSubmit}>
                {submitBtnText || 'Save'}
              </Button>
            </>
          )}
        </Box>
      </Card>
      {appendContent && appendContent}
    </>
  )
}

export default AccountSubcategoryPage
