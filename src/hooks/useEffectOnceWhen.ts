import { useEffect, useEffectEvent, useRef } from 'react'

export const useEffectOnceWhen = (callback: () => unknown, condition?: boolean) => {
  const callBackEvent = useEffectEvent(() => {
    callback()
  })

  const executedRef = useRef(false)

  useEffect(() => {
    if (!executedRef.current && (condition || typeof condition === 'undefined')) {
      executedRef.current = true
      callBackEvent()
    }
  }, [condition])
}
