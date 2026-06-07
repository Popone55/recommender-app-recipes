import { useCallback, useMemo, useState } from 'react'
import { pickRandomIndex } from '../plugins/utils/pickRandomIndex'
import { useEffectOnceWhen } from './useEffectOnceWhen'

export const useRandomItem = <T>(items: T[] | undefined | null) => {
  const [index, setIndex] = useState<number | null>(null)

  const pickAnother = useCallback(() => {
    if (!items?.length) {
      return
    }

    setIndex((current) => pickRandomIndex(items.length, current))
  }, [items])

  useEffectOnceWhen(() => {
    setIndex(pickRandomIndex(items!.length))
  }, !!items?.length)

  return useMemo(
    () => ({ item: index !== null && items ? items[index] : null, pickAnother }),
    [index, items, pickAnother]
  )
}
