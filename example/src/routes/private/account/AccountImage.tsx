import React from 'react'
import {
  Box,
  IconButton,
  Avatar,
  styled,
  BoxProps,
  Menu,
  MenuItem,
  ListItemIcon
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useToggleByAnchor } from 'fm-mui'

export interface AccountImageProps extends BoxProps {
  src?: string | undefined
  onActionClick?(): void
  onDelete?(): void
}

const StyledAccountImage = styled(Box)<AccountImageProps>(({ theme }) => ({
  position: 'relative',

  '.MuiIconButton-root': {
    position: 'absolute',
    bottom: 5,
    right: 5,
    zIndex: 10,
    background: theme.palette.primary.main,
    border: `3px solid ${theme.palette.grey1.main}`,
    transition: 'background .2s ease',

    '&:hover': {
      background: theme.palette.primary.dark
    },

    [theme.breakpoints.only('xs')]: {
      right: 0,
      bottom: 0
      //   padding: "2px",
    },

    '.MuiSvgIcon-root': {
      fontSize: '18px',
      color: theme.palette.white.main,

      [theme.breakpoints.only('xs')]: {
        fontSize: '16px'
      }
    }
  },

  '.MuiAvatar-root': {
    width: '130px',
    height: '130px',

    [theme.breakpoints.only('xs')]: {
      width: '100px',
      height: '100px'
    }
  }
}))

function AccountImage({
  src,
  onActionClick,
  onDelete,
  ...rest
}: AccountImageProps) {
  const menu = useToggleByAnchor()

  const handleDelete = () => {
    if (onDelete) onDelete()
    menu.hide()
  }
  return (
    <StyledAccountImage src={src} {...rest}>
      <IconButton size='small' onClick={menu.show}>
        <EditIcon fontSize='small' />
      </IconButton>
      <Menu
        anchorEl={menu.anchorEl}
        open={menu.open}
        onClose={menu.hide}
        onClick={menu.hide}
      >
        <MenuItem onClick={onActionClick}>
          <ListItemIcon sx={{ minWidth: 26 }}>
            <CloudUploadIcon fontSize='small' />
          </ListItemIcon>
          {src ? 'Upload new photo' : 'Upload Photo'}
        </MenuItem>
        {src && (
          <MenuItem onClick={handleDelete}>
            <ListItemIcon sx={{ minWidth: 26 }}>
              <DeleteForeverIcon fontSize='small' />
            </ListItemIcon>{' '}
            Delete Photo
          </MenuItem>
        )}
      </Menu>
      <Avatar src={src} />
    </StyledAccountImage>
  )
}

export default AccountImage
