import React from 'react'
import {
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Box,
  styled,
  TypographyProps,
  ListItem,
  SvgIcon,
  SvgIconProps
} from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { Swiper, SwiperSlide } from 'swiper/react'
import swiper from 'swiper'
import clsx from 'clsx'

import UnstyledRouterLink from './UnstyledRouterLink'
import { hasChildItems } from 'utils'
import { MenuItemRecord } from 'types'

export interface SlidingMenuProps {
  testId?: string
  items: MenuItemRecord[]
  router?: boolean
  title?: React.ReactNode
  variant?: 'default' | 'lined'
  activeIndex?: number
  secondLevel?: MenuItemRecord | null
  thirdLevel?: MenuItemRecord | null
  titleTypographyProps?: TypographyProps
  itemTypographyProps?: TypographyProps
  itemIconProps?: SvgIconProps
  parentItemTypographyProps?: TypographyProps
  activeItemTypographyProps?: TypographyProps
  activeItemClass?: string
  nextIcon?: typeof SvgIcon
  prevIcon?: typeof SvgIcon
  nextIconProps?: SvgIconProps
  prevIconProps?: SvgIconProps
  onInit(swiperInstance: swiper): void
  onItemClick(item: MenuItemRecord): void
  onBackClick(): void
}

const StyledSlidingMenu = styled(Box)<Partial<SlidingMenuProps>>(
  ({ theme, variant = 'default' }) => ({
    '.MuiListItemIcon-root': {
      minWidth: theme.spacing(4.5)
    },
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
  router,
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
  nextIcon = ChevronRightIcon,
  prevIcon = ChevronLeftIcon,
  itemIconProps,
  nextIconProps,
  prevIconProps,
  onInit,
  onItemClick,
  onBackClick
}: SlidingMenuProps) => {
  const getItem = (item: MenuItemRecord, key?: string) => {
    const btnProps =
      hasChildItems(item) || item.href
        ? {
            onClick: () => onItemClick(item)
          }
        : {}
    return (
      <ListItemButton
        key={key}
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
            'SlidingMenuItem-active': item.active,
            'SlidingMenuItem-parent': hasChildItems(item)
          }
        )}
        {...btnProps}
      >
        {item.icon && (
          <ListItemIcon>
            {React.createElement(item.icon, itemIconProps)}
          </ListItemIcon>
        )}
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
            {React.createElement(nextIcon, nextIconProps)}
          </Box>
        )}
      </ListItemButton>
    )
  }

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
            onClick={onBackClick}
          >
            <Box
              data-testid={`${testId}-icon-prev`}
              className='SlidingMenuItem-icon SlidingMenuItemIcon-prev'
              display='inline-flex'
            >
              {React.createElement(prevIcon, prevIconProps)}
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
          {section.childItems?.map((item: MenuItemRecord) =>
            router && item.path ? (
              <UnstyledRouterLink key={item.title} to={item.path}>
                {getItem(item)}
              </UnstyledRouterLink>
            ) : (
              getItem(item, item.title)
            )
          )}
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
            {items.map((item: MenuItemRecord) =>
              router && item.path ? (
                <UnstyledRouterLink key={item.title} to={item.path}>
                  {getItem(item)}
                </UnstyledRouterLink>
              ) : (
                getItem(item, item.title)
              )
            )}
          </List>
        </SwiperSlide>
        <SwiperSlide>{getMenuSection(secondLevel)}</SwiperSlide>
        <SwiperSlide>{getMenuSection(thirdLevel)}</SwiperSlide>
      </Swiper>
    </StyledSlidingMenu>
  )
}

export default SlidingMenu
