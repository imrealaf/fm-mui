import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from 'store'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export { default as useSearch } from './useSearch'
export { default as useQuery } from './useQuery'
export { default as useAuth } from './useAuth'
export { default as useDb } from './useDb'
export { default as useStorage } from './useStorage'
export { default as useApp } from './useApp'
export { default as useSettings } from './useSettings'
export { default as useUser } from './useUser'
export { default as useProfile } from './useProfile'
