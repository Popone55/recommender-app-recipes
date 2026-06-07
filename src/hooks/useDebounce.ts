import { useEffect, useEffectEvent } from 'react'

export const useDebounce = (callback: () => void, dependency: string | boolean, delay: number) => {
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
