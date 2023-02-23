import React, { useEffect } from 'react'
import { styled, List, ListItemButton, ListItemText, Box } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useSwipeable } from 'react-swipeable'

import config, { getProps } from '../config'
import { hasChildItems, transformData } from '../utils'
import { MenuItemRecord, ThemeColorProp } from '../types'

export interface MobileMenuProps {
  testId?: string
  open?: boolean
  color?: ThemeColorProp
  items?: MenuItemRecord[]
  header?: React.ReactNode
  footer?: React.ReactNode
  onToggle?(): void
}

interface MobileMenuSectionProps {
  testId?: string
  section: MenuItemRecord | null
  handleBackClick(): void
  handleItemClick(item: MenuItemRecord): void
}

const MobileMenuSection = ({
  testId,
  section,
  handleBackClick,
  handleItemClick
}: MobileMenuSectionProps) => {
  return section !== null ? (
    <List disablePadding data-testid={`${testId}-section`}>
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
})<Partial<MobileMenuProps> & { headerHeight: number }>(
  ({
    theme,
    open,
    color = 'secondary',
    headerHeight = config.ResponsiveHeader.defaultProps.heightSm
  }) => ({
    position: 'absolute',
    background: theme.palette[color].main,
    width: '100%',
    top: 0,
    left: 0,
    zIndex: theme.zIndex.appBar + 1,
    transition: `all  ${config.MobileMenu.transitionDuration}ms ease`,

    '.MobileMenu-header': {
      height: headerHeight,
      opacity: 0,
      transition: `all .2s ease ${config.MobileMenu.transitionDuration}ms`,
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
      transition: `all .2s ease ${
        config.MobileMenu.transitionDuration - 200
      }ms`,
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
  testId = 'mobile-menu',
  open = false,
  color = 'secondary',
  items = [],
  header,
  footer,
  onToggle
}: MobileMenuProps) => {
  const headerProps = getProps('ResponsiveHeader')
  const [swiper, setSwiper] = React.useState<typeof Swiper | any>(null)
  const [secondLevel, setSecondLevel] = React.useState<MenuItemRecord | null>(
    null
  )
  const [thirdLevel, setThirdLevel] = React.useState<MenuItemRecord | null>(
    null
  )
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
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  useEffect(() => {
    if (!open && swiper) {
      setSecondLevel(null)
      setThirdLevel(null)
      setTimeout(() => {
        swiper.slideTo(0)
      }, config.MobileMenu.transitionDuration)
    }
  }, [open, swiper])

  return (
    <StlyedMobileMenu
      data-testid={testId}
      open={open}
      color={color}
      headerHeight={headerProps.heightSm}
      className='MobileMenu-root'
      {...swipeHandlers}
    >
      <Box className='MobileMenu-header' />
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
                    testId={testId}
                    section={secondLevel}
                    handleBackClick={handleBackClick}
                    handleItemClick={handleItemClick}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <MobileMenuSection
                    testId={testId}
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
