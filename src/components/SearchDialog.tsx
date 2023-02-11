import React from 'react'
import {
  Dialog,
  Input,
  InputAdornment,
  InputProps,
  IconButton,
  Slide,
  styled
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { handleTextChange } from '../utils'
import { useBreakpoint } from '../hooks'

export interface SearchDialogProps {
  open: boolean
  height?: number
  heightSm?: number
  InputProps?: InputProps
  value?: string
  onClear?(): void
  onClose(): void
  onSubmit?(): void
  onChange?(data: { name: string; value: string }): void
}

const StyledSearchDialog = styled(Dialog, {
  shouldForwardProp: (prop) => prop !== 'heightSm'
})<Partial<SearchDialogProps>>(({ theme, height, heightSm }) => ({
  '.MuiDialog-container': {
    height,
    [theme.breakpoints.down('sm')]: {
      height: heightSm
    }
  },
  '.MuiInputBase-input': {
    height,
    padding: `0 0 0 ${theme.spacing(2)}`,
    fontSize: theme.typography.h5.fontSize,

    [theme.breakpoints.down('sm')]: {
      height: heightSm,
      fontSize: theme.typography.subtitle1.fontSize
    }
  }
}))

const SearchDialog = ({
  open = false,
  height = 64,
  heightSm = 56,
  value = '',
  onChange,
  onClose,
  onClear,
  onSubmit,
  InputProps
}: SearchDialogProps) => {
  const bp = useBreakpoint()
  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (onChange) {
      handleTextChange(event, onChange)
    }
  }

  return (
    <StyledSearchDialog
      open={open}
      height={height}
      heightSm={heightSm}
      fullScreen
      onClose={onClose}
      TransitionComponent={Slide}
    >
      <Input
        autoFocus={true}
        placeholder='Search..'
        {...InputProps}
        value={value}
        onChange={handleOnChange}
        disableUnderline={true}
        endAdornment={
          <InputAdornment position='end'>
            {value.length > 0 && onClear && (
              <IconButton
                onClick={onClear}
                size={bp.smAndDown ? 'small' : 'medium'}
              >
                <HighlightOffIcon
                  fontSize={bp.smAndDown ? 'medium' : 'large'}
                />
              </IconButton>
            )}
            <IconButton
              size={bp.smAndDown ? 'small' : 'medium'}
              color={!value.length ? 'default' : 'primary'}
              disabled={!value.length}
              onClick={onSubmit}
            >
              <SearchIcon fontSize={bp.smAndDown ? 'medium' : 'large'} />
            </IconButton>
          </InputAdornment>
        }
      />
    </StyledSearchDialog>
  )
}

export default SearchDialog
