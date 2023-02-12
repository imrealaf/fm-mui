import React from 'react'
import {
  List,
  ListItemButton,
  ListItemText,
  Box,
  styled,
  TypographyProps,
  ListItem
} from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { Swiper as ReactSwiper, SwiperSlide } from 'swiper/react'
import Swiper from 'swiper'
import clsx from 'clsx'

import { hasChildItems } from '../utils'
import { MenuItemRecord, ThemeColorProp } from '../types'

export interface SlidingMenuProps {
  items: MenuItemRecord[]
  title?: React.ReactNode
  variant?: 'default' | 'lined'
  activeIndex?: number
  secondLevel?: MenuItemRecord | null
  thirdLevel?: MenuItemRecord | null
  titleTypographyProps?: TypographyProps
  itemTypographyProps?: TypographyProps
  parentItemTypographyProps?: TypographyProps
  activeItemTypographyProps?: TypographyProps
  activeItemClass?: string
  nextIcon?: React.ReactNode
  prevIcon?: React.ReactNode
  nextIconColor?: ThemeColorProp
  prevIconColor?: ThemeColorProp
  onInit(swiperInstance: Swiper): void
  onItemClick(item: MenuItemRecord): void
  onBackClick(): void
}

const StyledSlidingMenu = styled(Box)<Partial<SlidingMenuProps>>(
  ({ theme, variant = 'default' }) => ({
    ...(variant === 'lined' && {
      '.SlidingMenuItem-title': {
        borderBottom: `1px solid ${theme.palette.divider}`
      },
      '.MuiListItemButton-root': {
        borderBottom: `1px solid ${theme.palette.divider}`,
        '&:last-of-type': {
          borderBottom: 'none'
        }
      }
    })
  })
)

const SlidingMenu = ({
  items = [],
  title,
  variant = 'default',
  activeIndex = 0,
  secondLevel = null,
  thirdLevel = null,
  activeItemClass,
  titleTypographyProps,
  itemTypographyProps,
  parentItemTypographyProps,
  activeItemTypographyProps,
  nextIcon = <ChevronRightIcon />,
  prevIcon = <ChevronLeftIcon />,
  onInit,
  onItemClick,
  onBackClick
}: SlidingMenuProps) => {
  const getMenuSection = (section: MenuItemRecord | null) => {
    return section !== null ? (
      <Box className='SlidingMenuSection-root'>
        <List disablePadding>
          <ListItemButton
            className='SlidingMenuItem-parent'
            sx={{ pl: 1 }}
            onClick={() => onBackClick()}
          >
            <Box
              className='SlidingMenuItem-icon SlidingMenuItemIcon-prev'
              display='inline-flex'
            >
              {prevIcon}
            </Box>
            <ListItemText
              primary={section.title}
              primaryTypographyProps={{
                fontWeight: 700,
                ...parentItemTypographyProps
              }}
              sx={{ ml: 1 }}
            />
          </ListItemButton>
          {section.childItems?.map((item: MenuItemRecord) => (
            <ListItemButton
              selected={item.active}
              disableRipple={item.active}
              disableTouchRipple={item.active}
              className={clsx(
                'SlidingMenuItem-root',
                item.active && activeItemClass ? activeItemClass : '',
                {
                  'SlidingMenuItem-active': item.active
                }
              )}
              key={item.title}
              onClick={() => onItemClick(item)}
            >
              <ListItemText
                primary={item.title}
                primaryTypographyProps={
                  item.active
                    ? { ...itemTypographyProps, ...activeItemTypographyProps }
                    : itemTypographyProps
                }
              />
              {hasChildItems(item) && nextIcon}
            </ListItemButton>
          ))}
        </List>
      </Box>
    ) : null
  }

  return (
    <StyledSlidingMenu variant={variant} className='SlidingMenu-root'>
      <ReactSwiper
        initialSlide={activeIndex}
        spaceBetween={0}
        slidesPerView={1}
        allowTouchMove={false}
        onSwiper={onInit}
      >
        <SwiperSlide>
          <List disablePadding>
            {title && (
              <ListItem className='SlidingMenuItem-title'>
                <ListItemText
                  primary={title}
                  primaryTypographyProps={titleTypographyProps}
                />
              </ListItem>
            )}
            {items.map((item: MenuItemRecord) => (
              <ListItemButton
                selected={item.active}
                disableRipple={item.active}
                disableTouchRipple={item.active}
                className={clsx(
                  'SlidingMenuItem-root',
                  item.active && activeItemClass ? activeItemClass : '',
                  {
                    'SlidingMenuItem-active': item.active
                  }
                )}
                key={item.title}
                onClick={() => onItemClick(item)}
              >
                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={
                    item.active
                      ? { ...itemTypographyProps, ...activeItemTypographyProps }
                      : itemTypographyProps
                  }
                />
                {hasChildItems(item) && (
                  <Box
                    className='SlidingMenuItem-icon SlidingMenuItemIcon-next'
                    display='inline-flex'
                  >
                    {nextIcon}
                  </Box>
                )}
              </ListItemButton>
            ))}
          </List>
        </SwiperSlide>
        <SwiperSlide>{getMenuSection(secondLevel)}</SwiperSlide>
        <SwiperSlide>{getMenuSection(thirdLevel)}</SwiperSlide>
      </ReactSwiper>
    </StyledSlidingMenu>
  )
}

export default SlidingMenu
