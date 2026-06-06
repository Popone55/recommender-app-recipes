import { logger } from '@plugins/logger'
import { useCallback, useState } from 'react'

export const LocalStorageKey = {
  FEEDBACK_ITEMS: 'feedback-items'
} as const

type LocalStorageKey = (typeof LocalStorageKey)[keyof typeof LocalStorageKey]

export const getLocalStorageValue = <K>(key: LocalStorageKey) => {
  try {
    const val = localStorage.getItem(key)
    if (!val) return null
    return JSON.parse(val) as K
  } catch (e) {
    logger.error(e)
    return null
  }
}

export const setLocalStorageValue = <K>(key: LocalStorageKey, value: K) => {
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

type UseLocalStorageValue<T> = readonly [
  value: T | null,
  setValue: (value: T) => void,
  resetValue: () => void
]

const useLocalStorage = <T>(key: LocalStorageKey): UseLocalStorageValue<T> => {
  const [value, setValue] = useState<T | null>(getLocalStorageValue<T>(key))

  const handleSetValue = useCallback(
    (value: T) => {
      const localStorageValue = setLocalStorageValue<T>(key, value)
      if (localStorageValue !== undefined) {
        setValue(localStorageValue)
      }
    },
    [key]
  )

  const handleRemoveValue = useCallback(() => {
    removeLocalStorageValue(key)
    setValue(null)
  }, [key])

  return [value, handleSetValue, handleRemoveValue] as const
}

export { useLocalStorage }
