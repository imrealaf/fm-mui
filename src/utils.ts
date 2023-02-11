import { SelectChangeEvent } from '@mui/material'

import { MenuItemRecord } from './types'

export const formatPhoneNumber = (value = '') => {
  // return nothing if no value
  if (!value) return value

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

export const handleTextChange = (
  event: React.ChangeEvent,
  onChange: (data: { name: string; value: string }) => void
) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  const name = target.getAttribute('name') as string

  if (onChange)
    onChange({
      name,
      value
    })
}

export const handlePhoneChange = (
  event: React.ChangeEvent,
  onChange: (data: { name: string; value: string }) => void
) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  const name = target.getAttribute('name') as string

  if (value.length < 15) {
    const cleaned = value.replace(/\D/g, '')

    if (onChange)
      onChange({
        name,
        value: formatPhoneNumber(cleaned)
      })
  }
}

export const handleSelectChange = (
  event: SelectChangeEvent<unknown>,
  onChange: (data: { name: string; value: string }) => void
) => {
  const target = event.target as HTMLSelectElement
  const name = target.name
  const value = target.value

  if (onChange)
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

export const transformData = (items: MenuItemRecord[] = []) => {
  items.forEach((item, index) => {
    if (hasChildItems(item)) {
      item.childItems?.forEach((childItem) => {
        childItem.parent = index
        if (hasChildItems(childItem)) transformData(childItem.childItems)
      })
    }
  })
}