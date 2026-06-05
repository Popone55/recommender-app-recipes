import { useEffect, useEffectEvent } from 'react'

export const useDebounce = (callback: () => void, dependency: unknown, delay: number) => {
  const callBackEvent = useEffectEvent(() => {
    callback()
  })

  useEffect(() => {
    const timeout = setTimeout(() => {
      callBackEvent()
    }, delay)

    return () => {
      clearTimeout(timeout)
    }
  }, [delay, dependency])
}
