import { logger } from './logger'

export const LocalStorageKey = {
  RECIPES: 'recipes'
} as const

type LocalStorageKey = (typeof LocalStorageKey)[keyof typeof LocalStorageKey]

export const getLocalStorageValue = <T>(key: LocalStorageKey) => {
  try {
    const val = localStorage.getItem(key)
    if (!val) return undefined
    return JSON.parse(val) as T
  } catch (e) {
    logger.error(e)
    return undefined
  }
}

export const setLocalStorageValue = <T>(key: LocalStorageKey, value: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return value
  } catch (e) {
    logger.error(e)
    return undefined
  }
}

export const removeLocalStorageValue = (key: LocalStorageKey) => {
  localStorage.removeItem(key)
}
