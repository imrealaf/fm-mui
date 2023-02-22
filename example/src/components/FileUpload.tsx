import React from 'react'
import { Box, Typography, styled } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import clsx from 'clsx'
import bytes from 'bytes'

export type FileUploadProps = {
  imageButton?: boolean
  accept: string
  hoverLabel?: string
  dropLabel?: string
  width?: string
  height?: string
  backgroundColor?: string
  image?: {
    url: string
    imageStyle?: {
      width?: string
      height?: string
    }
  }
  maxSize?: number // MB
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onDrop: (event: React.DragEvent<HTMLElement>) => void
  onError?(message?: string): void
}

const StyledFileUpload = styled('label')(() => ({
  cursor: 'pointer',
  textAlign: 'center',
  display: 'flex',
  '&:hover p,&:hover svg,& img': {
    opacity: 1
  },
  '& p, svg': {
    opacity: 0.4
  },
  '&:hover img': {
    opacity: 0.3
  },
  '& .noMouseEvent': {
    pointerEvents: 'none'
  },
  '& .iconText': {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute'
  },
  '& .hidden': {
    display: 'none'
  },
  '& .onDragOver': {
    '& img': {
      opacity: 0.3
    },
    '& p, svg': {
      opacity: 1
    }
  }
}))

const FileUpload: React.FC<FileUploadProps> = ({
  accept,
  maxSize = 3, // mb
  imageButton = false,
  hoverLabel = 'Click or drag to upload file',
  dropLabel = 'Drop file here',
  width = '100%',
  height = '100px',
  backgroundColor = '#fff',
  onChange,
  onDrop,
  onError
}) => {
  const [labelText, setLabelText] = React.useState<string>(hoverLabel)
  const [isDragOver, setIsDragOver] = React.useState<boolean>(false)
  const [isMouseOver, setIsMouseOver] = React.useState<boolean>(false)
  const stopDefaults = (e: React.DragEvent) => {
    e.stopPropagation()
    e.preventDefault()
  }
  const dragEvents = {
    onMouseEnter: () => {
      setIsMouseOver(true)
    },
    onMouseLeave: () => {
      setIsMouseOver(false)
    },
    onDragEnter: (e: React.DragEvent) => {
      stopDefaults(e)
      setIsDragOver(true)
      setLabelText(dropLabel)
    },
    onDragLeave: (e: React.DragEvent) => {
      stopDefaults(e)
      setIsDragOver(false)
      setLabelText(hoverLabel)
    },
    onDragOver: stopDefaults,
    onDrop: (e: React.DragEvent<HTMLElement>) => {
      stopDefaults(e)
      setLabelText(hoverLabel)
      setIsDragOver(false)
      onDrop(e)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target?.files?.length && event.target?.files[0]) {
      const size = event.target.files[0].size

      if (size > bytes(`${maxSize}MB`) && onError) {
        onError(`File size exceeds the maximum of ${maxSize}MB`)
      } else {
        onChange(event)
      }
    }
  }

  return (
    <Box>
      <input
        onChange={handleChange}
        accept={accept}
        style={{ display: 'none' }}
        id='file-upload'
        type='file'
      />

      <StyledFileUpload
        htmlFor='file-upload'
        {...dragEvents}
        className={clsx(isDragOver && 'onDragOver')}
      >
        <Box
          width={width}
          height={height}
          bgcolor={backgroundColor}
          className='noMouseEvent'
        >
          {(!imageButton || isDragOver || isMouseOver) && (
            <>
              <Box height={height} width={width} className='iconText'>
                <CloudUploadIcon fontSize='large' />
                <Typography>{labelText}</Typography>
              </Box>
            </>
          )}
        </Box>
      </StyledFileUpload>
    </Box>
  )
}

export default FileUpload
