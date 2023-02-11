import React, { useEffect, useState } from 'react'
import { styled, List, ListItemButton, ListItemText, Box } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useSwipeable } from 'react-swipeable'

import { hasChildItems, transformData } from '../utils'
import { MenuItemRecord, ThemeColorProp } from '../types'

const TRANSITION_DURATION = 400
const DEFAULT_HEADER_HEIGHT = 56

export interface MobileMenuProps {
  headerHeight?: number
  open?: boolean
  color?: ThemeColorProp
  items?: MenuItemRecord[]
  header?: React.ReactNode
  footer?: React.ReactNode
  onToggle?(): void
}

interface MobileMenuSectionProps {
  section: MenuItemRecord | null
  handleBackClick(): void
  handleItemClick(item: MenuItemRecord): void
}

const MobileMenuSection = ({
  section,
  handleBackClick,
  handleItemClick
}: MobileMenuSectionProps) => {
  return section !== null ? (
    <List disablePadding>
      <ListItemButton sx={{ pl: 1 }} onClick={() => handleBackClick()}>
        <ChevronLeftIcon />
        <ListItemText
          primary={section.title}
          primaryTypographyProps={{
            fontWeight: 700
          }}
        />
      </ListItemButton>
      {section.childItems?.map((item: MenuItemRecord) => (
        <ListItemButton key={item.title} onClick={() => handleItemClick(item)}>
          <ListItemText primary={item.title} />
          {hasChildItems(item) && <ChevronRightIcon />}
        </ListItemButton>
      ))}
    </List>
  ) : null
}

const StlyedMobileMenu = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'headerHeight'
})<Partial<MobileMenuProps>>(
  ({
    theme,
    open,
    color = 'secondary',
    headerHeight = DEFAULT_HEADER_HEIGHT
  }) => ({
    position: 'absolute',
    background: theme.palette[color].main,
    width: '100%',
    top: 0,
    left: 0,
    zIndex: theme.zIndex.appBar + 1,
    transition: `all  ${TRANSITION_DURATION}ms ease`,

    '.MobileMenu-header': {
      height: headerHeight,
      opacity: 0,
      transition: `all .2s ease ${TRANSITION_DURATION}ms`,
      ...(open && {
        opacity: 1
      })
    },

    '.MobileMenu-content': {
      opacity: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: `calc(100vh - ${headerHeight}px)`,
      transform: 'scale(1.05)',
      transition: `all .2s ease ${TRANSITION_DURATION - 200}ms`,
      ...(open && {
        opacity: 1,
        transform: 'scale(1)'
      })
    },

    ...(open
      ? {
          height: '100vh'
        }
      : {
          height: 0,
          overflow: 'hidden'
        })
  })
)

const MobileMenu = ({
  open = false,
  color = 'secondary',
  headerHeight = DEFAULT_HEADER_HEIGHT,
  items = [],
  header,
  footer,
  onToggle
}: MobileMenuProps) => {
  const [swiper, setSwiper] = useState<typeof Swiper | any>(null)
  const [secondLevel, setSecondLevel] = useState<MenuItemRecord | null>(null)
  const [thirdLevel, setThirdLevel] = useState<MenuItemRecord | null>(null)
  const hasMenuItems = items && items.length > 0

  if (hasMenuItems) {
    transformData(items)
  }

  const swipeHandlers = useSwipeable({
    onSwipedUp: () => {
      if (onToggle) onToggle()
    }
  })

  const handleItemClick = (item: MenuItemRecord) => {
    console.log('item click')
    if (hasChildItems(item)) {
      if (item.parent) {
        setThirdLevel(item)
      } else {
        setSecondLevel(item)
      }
      swiper.slideNext()
    } else {
      // Go to url or do something else
    }

    // if (onItemClick) onItemClick(item)
  }

  const handleBackClick = () => {
    swiper.slidePrev()
  }

  useEffect(() => {
    if (!open && swiper) {
      setSecondLevel(null)
      setThirdLevel(null)
      setTimeout(() => {
        swiper.slideTo(0)
      }, TRANSITION_DURATION)
    }
  }, [open, swiper])

  return (
    <StlyedMobileMenu
      open={open}
      color={color}
      headerHeight={headerHeight}
      className='MobileMenu-root'
      {...swipeHandlers}
    >
      <Box className='MobileMenu-header'></Box>
      <Box className='MobileMenu-content'>
        <Box>
          {header && <Box>{header}</Box>}
          <Box display='flex'>
            {hasMenuItems && (
              <Swiper
                spaceBetween={0}
                slidesPerView={1}
                allowTouchMove={false}
                onSwiper={(swiperInstance) => setSwiper(swiperInstance)}
              >
                <SwiperSlide>
                  <List disablePadding>
                    {items.map((item: MenuItemRecord) => (
                      <ListItemButton
                        key={item.title}
                        onClick={() => handleItemClick(item)}
                      >
                        <ListItemText primary={item.title} />
                        {hasChildItems(item) && <ChevronRightIcon />}
                      </ListItemButton>
                    ))}
                  </List>
                </SwiperSlide>
                <SwiperSlide>
                  <MobileMenuSection
                    section={secondLevel}
                    handleBackClick={handleBackClick}
                    handleItemClick={handleItemClick}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <MobileMenuSection
                    section={thirdLevel}
                    handleBackClick={handleBackClick}
                    handleItemClick={handleItemClick}
                  />
                </SwiperSlide>
              </Swiper>
            )}
          </Box>
        </Box>
        {footer && <Box>{footer}</Box>}
      </Box>
    </StlyedMobileMenu>
  )
}

export default MobileMenu
