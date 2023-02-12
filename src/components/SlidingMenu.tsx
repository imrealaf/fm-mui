import React from 'react'
import { List, ListItemButton, ListItemText, Box } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { Swiper as ReactSwiper, SwiperSlide } from 'swiper/react'
import Swiper from 'swiper'

import { hasChildItems, transformData } from '../utils'
import { MenuItemRecord } from '../types'

export interface SlidingMenuProps {
  items: MenuItemRecord[]
  activeIndex?: number
  secondLevel?: MenuItemRecord | null
  thirdLevel?: MenuItemRecord | null
  onInit(swiperInstance: Swiper): void
  onItemClick(item: MenuItemRecord): void
  onBackClick(): void
}

interface SlidingMenuSectionProps {
  section: MenuItemRecord | null
  handleBackClick(): void
  handleItemClick(item: MenuItemRecord): void
}

const SlidingMenuSection = ({
  section,
  handleBackClick,
  handleItemClick
}: SlidingMenuSectionProps) => {
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

const SlidingMenu = ({
  items = [],
  activeIndex = 0,
  secondLevel = null,
  thirdLevel = null,
  onInit,
  onItemClick,
  onBackClick
}: SlidingMenuProps) => {
  transformData()
  return (
    <Box className='SlidingMenu-root'>
      <ReactSwiper
        initialSlide={activeIndex}
        spaceBetween={0}
        slidesPerView={1}
        allowTouchMove={false}
        onSwiper={onInit}
      >
        <SwiperSlide>
          <List disablePadding>
            {items.map((item: MenuItemRecord) => (
              <ListItemButton
                key={item.title}
                onClick={() => onItemClick(item)}
              >
                <ListItemText primary={item.title} />
                {hasChildItems(item) && <ChevronRightIcon />}
              </ListItemButton>
            ))}
          </List>
        </SwiperSlide>
        <SwiperSlide>
          <SlidingMenuSection
            section={secondLevel}
            handleBackClick={onBackClick}
            handleItemClick={onItemClick}
          />
        </SwiperSlide>
        <SwiperSlide>
          <SlidingMenuSection
            section={thirdLevel}
            handleBackClick={onBackClick}
            handleItemClick={onItemClick}
          />
        </SwiperSlide>
      </ReactSwiper>
    </Box>
  )
}

export default SlidingMenu
