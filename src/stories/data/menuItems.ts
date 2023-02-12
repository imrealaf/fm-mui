import { MenuItemRecord } from '../../types'

const menuItems: MenuItemRecord[] = [
  {
    title: 'Item 1'
  },
  {
    title: 'Item 2',
    childItems: [
      {
        title: 'Sub item 1'
      },
      {
        title: 'Sub item 2',
        active: true,
        childItems: [
          {
            title: 'Third item 1'
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
