import React, { useState } from 'react'
import {
  Typography,
  Box,
  Alert,
  LinearProgress,
  DialogProps
} from '@mui/material'
import { Dialog } from 'fm-mui'

import FileUpload, { FileUploadProps } from './FileUpload'
import { useStorage } from 'hooks'
import { randomString } from 'utils'

interface UploadDialogProps extends DialogProps {
  accept?: string
  onClose(): void
  storagePath?: string
  fileName?: string
  onSuccess(url: string): void
}

function UploadDialog({
  accept = 'image/jpg, image/png',
  open,
  onClose,
  onSuccess,
  storagePath = '/images',
  fileName
}: UploadDialogProps) {
  const [imageError, setImageError] = useState('')
  const { progress, uploadFile } = useStorage()

  const fileUploadProps: FileUploadProps = {
    accept,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      setImageError('')
      if (event.target.files !== null && event.target?.files?.length > 0) {
        uploadImage(event.target.files[0])
      }
    },
    onDrop: (event: React.DragEvent<HTMLElement>) => {
      setImageError('')
      uploadImage(event.dataTransfer.files[0])
    },
    onError: (message: string) => {
      setImageError(message)
    }
  }

  const uploadImage = async (file: any) => {
    if (!file) return
    const name = fileName || randomString()
    try {
      const downloadURL = (await uploadFile(file, storagePath, name)) as string
      if (onSuccess) onSuccess(downloadURL)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title='Upload Image'
      maxWidth='xs'
      fullWidth
      showClose
      contentProps={{
        sx: {
          px: 0
        }
      }}
    >
      <Box>
        {imageError && (
          <Alert sx={{ mx: 3 }} severity='error'>
            {imageError}
          </Alert>
        )}
        {progress > 0 ? (
          <Box px={3} py={5} textAlign='center'>
            <LinearProgress variant='determinate' value={progress} />
            <Typography mt={1} color='grey6.main'>
              {progress}%
            </Typography>
          </Box>
        ) : (
          <FileUpload {...fileUploadProps} />
        )}
      </Box>
    </Dialog>
  )
}

export default UploadDialog
