import React from 'react'
import { SelectChangeEvent } from '@mui/material'
import * as utils from './utils'

describe('formatPhoneNumber', () => {
  it('returns nothing', () => {
    const number = utils.formatPhoneNumber('')
    expect(number).toBe('')
  })

  it('returns formatted number', () => {
    const number = utils.formatPhoneNumber('6473552626')
    expect(number).toBe('(647) 355-2626')
  })

  it('returns partial formatted number > 4', () => {
    const number = utils.formatPhoneNumber('647')
    expect(number).toBe('647')
  })

  it('returns partial formatted number > 7', () => {
    const number = utils.formatPhoneNumber('647355')
    expect(number).toBe('(647) 355')
  })
})

describe('handleTextChange', () => {
  it('passes event data and calls on change', () => {
    const input = document.createElement('input')
    input.type = 'text'
    input.name = 'foo'
    input.value = 'bar'
    const event = {
      target: input
    } as React.ChangeEvent<HTMLInputElement>
    const onChange = jest.fn()
    utils.handleTextChange(event, onChange)
    expect(onChange).toHaveBeenCalledWith({
      name: 'foo',
      value: 'bar'
    })
  })
})

describe('handlePhoneChange', () => {
  it('passes event data and calls on change', () => {
    const input = document.createElement('input')
    input.type = 'text'
    input.name = 'phone'
    input.value = '6473552626'
    const event = {
      target: input
    } as React.ChangeEvent<HTMLInputElement>
    const onChange = jest.fn()
    utils.handlePhoneChange(event, onChange)
    expect(onChange).toHaveBeenCalledWith({
      name: 'phone',
      value: '(647) 355-2626'
    })
  })

  it('doesnt call onChange if value > 15', () => {
    const input = document.createElement('input')
    input.type = 'text'
    input.name = 'phone'
    input.value = '64735526265345435433'
    const event = {
      target: input
    } as React.ChangeEvent<HTMLInputElement>
    const onChange = jest.fn()
    utils.handlePhoneChange(event, onChange)
    expect(onChange).toHaveBeenCalledTimes(0)
  })
})

describe('handleSelectChange', () => {
  it('passes event data and calls on change', () => {
    const select = document.createElement('select') as HTMLSelectElement
    select.name = 'foo'
    select.value = ''
    const event = {
      target: select
    } as unknown as SelectChangeEvent<unknown>
    const onChange = jest.fn()
    utils.handleSelectChange(event, onChange)
    expect(onChange).toHaveBeenCalledWith({
      name: 'foo',
      value: ''
    })
  })
})

describe('handleEnterKey', () => {
  it('fires callback on enter key press', () => {
    const event = {
      key: 'Enter'
    } as React.KeyboardEvent
    const callback = jest.fn()
    utils.handleEnterKey(event, callback)
    expect(callback).toHaveBeenCalledWith(event)
  })
  it('doesnt fire callback on any other key', () => {
    const event = {
      key: 'Shift'
    } as React.KeyboardEvent
    const callback = jest.fn()
    utils.handleEnterKey(event, callback)
    expect(callback).toHaveBeenCalledTimes(0)
  })
})

describe('getActiveItem', () => {
  it('returns active item', () => {
    const items = [
      {
        title: 'Item 1'
      },
      {
        title: 'Item 2',
        active: true
      }
    ]
    const active = utils.getActiveItem(items)
    expect(active).toBe(items[1])
  })
  it('returns 3rd level active item', () => {
    const items = [
      {
        title: 'Item 1'
      },
      {
        title: 'Item 2',
        active: true,
        childItems: [
          {
            title: 'Child item',
            childItems: [
              {
                title: 'deep item',
                active: true
              }
            ]
          }
        ]
      }
    ]
    const active = utils.getActiveItem(items)
    expect(active?.title).toBe('deep item')
  })
})

describe('transformData', () => {
  it('runs properly', () => {
    const items = [
      {
        title: 'Item 1',
        level: 9
      },
      {
        title: 'Item 2',
        active: true
      }
    ]
    utils.transformData(items)
    expect(items[0].level).toBe(0)
  })
})
