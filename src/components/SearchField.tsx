import React from 'react'
import {
  IconButton,
  IconButtonProps,
  InputAdornment,
  OutlinedInput,
  OutlinedInputProps,
  SvgIcon,
  SvgIconProps,
  styled,
  Fade
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

import { handleEnterKey, handleTextChange } from '../utils'

export interface SearchFieldProps extends OutlinedInputProps {
  variant?: 'filled' | 'outlined'
  testId?: string
  value?: string
  naked?: boolean
  elevationOnHover?: boolean
  elevationOnFocus?: boolean
  IconButtonProps?: IconButtonProps
  IconProps?: SvgIconProps
  searchIcon?: typeof SvgIcon
  searchIconProps?: SvgIconProps
  clearIcon?: typeof SvgIcon
  clearIconProps?: SvgIconProps
  clearBtnProps?: IconButtonProps
  onClear?(): void
  onSubmit?(): void
  onChanged?(data?: { name: string; value: any }): void
}

const StyledSearchField = styled(OutlinedInput, {
  shouldForwardProp: (prop) =>
    prop !== 'elevationOnHover' &&
    prop !== 'elevationOnFocus' &&
    prop !== 'naked'
})<Partial<SearchFieldProps>>(
  ({ theme, elevationOnHover, elevationOnFocus, naked, variant }) => ({
    border: 'none',
    // paddingLeft: theme.spacing(1),
    transition: 'all .2s ease',
    borderRadius: theme.shape.borderRadius > 0 ? 30 : 0,

    '.MuiInputAdornment-positionStart': {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(0.5)
    },

    ...(variant === 'filled' &&
      !naked && {
        background: theme.palette.grey[100]
      }),

    ...(variant === 'filled' || naked
      ? {
          '.MuiOutlinedInput-notchedOutline': {
            display: 'none'
          }
        }
      : {}),

    ...(!naked
      ? {
          ...(elevationOnHover && {
            '&:hover': {
              boxShadow: theme.shadows[2]
            }
          }),

          ...(elevationOnFocus && {
            '&.Mui-focused': {
              boxShadow: theme.shadows[2]
            }
          })
        }
      : {
          borderRadius: 0
        })
  })
)

const SearchField = ({
  testId = 'search-field',
  variant = 'outlined',
  placeholder = 'Search ...',
  value = '',
  naked = false,
  elevationOnHover = false,
  elevationOnFocus = false,
  IconButtonProps,
  IconProps,
  searchIcon = SearchIcon,
  searchIconProps,
  clearIcon = CloseIcon,
  clearIconProps,
  clearBtnProps,
  onClear,
  onSubmit,
  onChange,
  onChanged,
  ...rest
}: SearchFieldProps) => {
  const showClear = onClear && value.length > 0
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (value.length > 0 && onSubmit) {
      handleEnterKey(event, onSubmit)
    }
  }
  return (
    <StyledSearchField
      data-testid={testId}
      {...rest}
      variant={variant}
      placeholder={placeholder}
      naked={naked}
      elevationOnHover={elevationOnHover}
      elevationOnFocus={elevationOnFocus}
      value={value}
      onKeyDown={onKeyDown}
      onChange={(e) => {
        if (onChanged) {
          handleTextChange(e, onChanged)
        } else if (onChange) {
          onChange(e)
        }
      }}
      startAdornment={
        <InputAdornment position='start'>
          {React.createElement(searchIcon, {
            color: 'inherit',
            ...IconProps,
            ...searchIconProps
          })}
        </InputAdornment>
      }
      endAdornment={
        <InputAdornment position='end'>
          <Fade in={showClear}>
            <IconButton
              data-testid={`${testId}-clear-btn`}
              size='small'
              {...IconButtonProps}
              {...clearBtnProps}
              onClick={onClear}
            >
              {React.createElement(clearIcon, {
                color: 'inherit',
                ...IconProps,
                ...clearIconProps
              })}
            </IconButton>
          </Fade>
        </InputAdornment>
      }
    />
  )
}

export default SearchField
