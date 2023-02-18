import React from 'react'
import { styled } from '@mui/material'

import config, { getProps } from '../config'
import Drawer from './Drawer'
import SearchField, { SearchFieldProps } from './SearchField'
import { useBreakpoint } from '../hooks'

export interface SearchDrawerProps extends SearchFieldProps {
  open: boolean
  onClose(): void
}

const StyledSearchDrawer = styled(Drawer, {
  shouldForwardProp: (prop) =>
    prop !== 'headerHeight' && prop !== 'headerHeightSm'
})<
  Partial<SearchDrawerProps> & { headerHeight: number; headerHeightSm: number }
>(({ theme, headerHeight, headerHeightSm }) => ({
  height: headerHeight,
  flexShrink: 0,

  '& .MuiDrawer-paper': {
    height: headerHeight,

    [theme.breakpoints.down(config.global.mobileBp)]: {
      height: headerHeightSm
    }
  },

  '.MuiInputBase-root': {
    padding: `0 ${theme.spacing(1)} 0 ${theme.spacing(1)}`,

    '.MuiInputBase-input': {
      padding: 0,
      height: headerHeight,

      [theme.breakpoints.down(config.global.mobileBp)]: {
        height: headerHeightSm
      }
    }
  }
}))

const SearchDrawer = ({
  open = false,
  value = '',
  onChanged,
  onClose,
  onClear,
  onSubmit
}: SearchDrawerProps) => {
  const bp = useBreakpoint()
  const headerProps = getProps('ResponsiveHeader')

  return (
    <StyledSearchDrawer
      anchor='top'
      open={open}
      headerHeight={headerProps.height}
      headerHeightSm={headerProps.heightSm}
      onClose={onClose}
    >
      <SearchField
        autoFocus={true}
        naked={true}
        value={value}
        onChanged={onChanged}
        onClear={onClear}
        onSubmit={onSubmit}
        IconProps={{
          fontSize: bp[config.global.mobileBpQuery] ? 'medium' : 'large'
        }}
      />
    </StyledSearchDrawer>
  )
}

export default SearchDrawer
