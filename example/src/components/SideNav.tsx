import React from 'react'
import { Drawer, MenuItemRecord, SlidingMenu, useSlidingMenu } from 'fm-mui'

export interface SideNavProps {
  items?: MenuItemRecord[]
}

const SideNav = ({ items = [] }: SideNavProps) => {
  const menu = useSlidingMenu(items)
  return (
    <Drawer variant='permanent'>
      <SlidingMenu
        items={menu.items}
        activeIndex={menu.activeIndex}
        onInit={menu.onInit}
        onItemClick={menu.onItemClick}
        onBackClick={menu.onBackClick}
        secondLevel={menu.secondLevel}
        thirdLevel={menu.thirdLevel}
      />
    </Drawer>
  )
}

export default SideNav
