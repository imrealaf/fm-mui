import { useEffect, useState } from 'react'
import Swiper from 'swiper'
import find from 'lodash/find'

import { hasChildItems, transformData, getActiveItem } from '../utils'
import { MenuItemRecord } from '../types'

function useSlidingMenu(items: MenuItemRecord[] = []) {
  // Transform the data
  transformData(items)

  const activeItem = getActiveItem(items)
  const activeIndex = activeItem ? activeItem.level : 0
  const getGetActiveSection = (index: number): MenuItemRecord | null => {
    if (activeItem && activeItem.level === index) {
      return activeItem.parent as MenuItemRecord
    } else {
      return null
    }
  }

  const [swiper, setSwiper] = useState<Swiper | null>(null)
  const [secondLevel, setSecondLevel] = useState<MenuItemRecord | null>(
    getGetActiveSection(1)
  )
  const [thirdLevel, setThirdLevel] = useState<MenuItemRecord | null>(
    getGetActiveSection(2)
  )

  const onInit = (swiperInstance: Swiper) => {
    setSwiper(swiperInstance)
  }

  const onItemClick = (item: MenuItemRecord) => {
    if (hasChildItems(item)) {
      if (item.parent) {
        setThirdLevel(item)
      } else {
        setSecondLevel(item)
      }
      swiper?.slideNext()
    } else {
      // Go to url or do something else
    }

    // if (onItemClick) onItemClick(item)
  }

  const onBackClick = () => {
    swiper?.slidePrev()
  }

  const resetMenu = (timeout: number = 0) => {
    setSecondLevel(null)
    setThirdLevel(null)
    setTimeout(() => {
      swiper?.slideTo(0)
    }, timeout)
  }

  return {
    items,
    swiper,
    activeIndex,
    secondLevel,
    thirdLevel,
    resetMenu,
    onInit,
    onItemClick,
    onBackClick
  }
}

export default useSlidingMenu
