import { MenuItemRecord } from '../types'

const menuItems: MenuItemRecord[] = [
  {
    title: 'Item 1',
    active: true
  },
  {
    title: 'Item 2',

    childItems: [
      {
        title: 'Sub item 1'
      },
      {
        title: 'Sub item 2',

        childItems: [
          {
            title: 'Third item 1'
            // active: true
          },
          {
            title: 'Third item 2'
          }
        ]
      }
    ]
  }
]

export default menuItems
