/* eslint-disable eqeqeq */
/* eslint-disable no-new-wrappers */
import validator from 'validator'
import { passwordConfig } from 'config'

export const isRequired = (value = '') => value.length > 0

export const hasValue = (value = '') => value.length > 0

export const isEmail = (value = '') => validator.isEmail(value)

export const isLength = (value = '', length: number) =>
  length ? validator.isLength(value, { min: length, max: length }) : false

export const isPostalCode = (value = '') => validator.isPostalCode(value, 'CA')

export const match = (value1: string, value2: string) =>
  value1 && value2
    ? new String(value1).valueOf() == new String(value2).valueOf()
    : false

export const isMinLength = (value = '', length?: number) =>
  value.length >= (length || passwordConfig.minLength)

export const containsNumbers = (value = '') => /\d/.test(value)
