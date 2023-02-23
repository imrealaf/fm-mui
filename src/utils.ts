import { SelectChangeEvent } from '@mui/material'

import { MenuItemRecord } from './types'

export const formatPhoneNumber = (value: string) => {
  // return nothing if no value
  if (!value) return ''

  // only allows 0-9 inputs
  const currentValue = value.replace(/[^\d]/g, '')
  const cvLength = currentValue.length

  // returns: "x", "xx", "xxx"
  if (cvLength < 4) return currentValue

  // returns: "(xxx)", "(xxx) x", "(xxx) xx", "(xxx) xxx",
  if (cvLength < 7)
    return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`

  // returns: "(xxx) xxx-", (xxx) xxx-x", "(xxx) xxx-xx", "(xxx) xxx-xxx", "(xxx) xxx-xxxx"
  return `(${currentValue.slice(0, 3)}) ${currentValue.slice(
    3,
    6
  )}-${currentValue.slice(6, 10)}`
}

export type ChangeEventData = {
  name: string
  value: any
}

export const handleTextChange = (
  event: React.ChangeEvent,
  onChange: (data: ChangeEventData) => void
) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  const name = target.getAttribute('name') as string

  onChange({
    name,
    value
  })
}

export const handlePhoneChange = (
  event: React.ChangeEvent,
  onChange: (data: ChangeEventData) => void
) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  const name = target.getAttribute('name') as string

  if (value.length < 15) {
    const cleaned = value.replace(/\D/g, '')

    onChange({
      name,
      value: formatPhoneNumber(cleaned)
    })
  }
}

export const handleSelectChange = (
  event: SelectChangeEvent<unknown>,
  onChange: (data: ChangeEventData) => void
) => {
  const target = event.target as HTMLSelectElement
  const name = target.name
  const value = target.value

  onChange({
    name,
    value
  })
}

export const handleEnterKey = (
  event: React.KeyboardEvent,
  callback: (event: React.KeyboardEvent) => void
) => {
  if (event.key === 'Enter') {
    callback(event)
  }
}

export const hasChildItems = (item: MenuItemRecord) =>
  item.childItems && item.childItems.length > 0

export const transformData = (items: MenuItemRecord[]) => {
  items.forEach((item) => {
    item.level = 0
    if (hasChildItems(item)) {
      item.childItems?.forEach((childItem) => {
        childItem.level = 1
        childItem.parent = item
        if (hasChildItems(childItem)) {
          childItem.childItems?.forEach((subChildItem) => {
            subChildItem.level = 2
            subChildItem.parent = childItem
            subChildItem.grandparent = childItem.parent
          })
        }
      })
    }
  })
}

export const getActiveItem = (
  items: MenuItemRecord[]
): MenuItemRecord | null => {
  const actives: MenuItemRecord[] = []
  items.forEach((item) => {
    if (item.active) actives.push(item)
    if (hasChildItems(item)) {
      item.childItems?.forEach((childItem) => {
        if (childItem.active) actives.push(childItem)
        if (hasChildItems(childItem)) {
          childItem.childItems?.forEach((subChild) => {
            if (subChild.active) actives.push(subChild)
          })
        }
      })
    }
  })
  return actives.length ? actives[actives.length - 1] : null
}
