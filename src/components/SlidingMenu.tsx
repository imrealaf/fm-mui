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
import { Swiper, SwiperSlide } from 'swiper/react'
import swiper from 'swiper'
import clsx from 'clsx'

import { hasChildItems } from '../utils'
import { MenuItemRecord, ThemeColorProp } from '../types'

export interface SlidingMenuProps {
  testId?: string
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
  onInit(swiperInstance: swiper): void
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
  testId = 'sliding-menu',
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
      <Box
        data-testid={`${testId}-section`}
        className='SlidingMenuSection-root'
      >
        <List disablePadding>
          <ListItemButton
            data-testid={`${testId}-menu-item-back`}
            className='SlidingMenuItem-parent'
            sx={{ pl: 1 }}
            onClick={() => onBackClick()}
          >
            <Box
              data-testid={`${testId}-icon-prev`}
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
              data-testid={`${testId}-menu-item`}
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
    <StyledSlidingMenu
      data-testid={testId}
      variant={variant}
      className='SlidingMenu-root'
    >
      <Swiper
        initialSlide={activeIndex}
        spaceBetween={0}
        slidesPerView={1}
        allowTouchMove={false}
        onSwiper={onInit}
      >
        <SwiperSlide>
          <List disablePadding>
            {title && (
              <ListItem
                className='SlidingMenuItem-title'
                data-testid={`${testId}-menu-item-title`}
              >
                <ListItemText
                  primary={title}
                  primaryTypographyProps={titleTypographyProps}
                />
              </ListItem>
            )}
            {items.map((item: MenuItemRecord) => (
              <ListItemButton
                data-testid={`${testId}-menu-item${
                  hasChildItems(item) ? '-parent' : ''
                }`}
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
                    data-testid={`${testId}-icon-next`}
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
      </Swiper>
    </StyledSlidingMenu>
  )
}

export default SlidingMenu
