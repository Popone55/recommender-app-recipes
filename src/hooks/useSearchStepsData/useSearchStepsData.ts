import { useMemo, useState } from 'react'

export const useSearchStepsData = () => {
  const [areaOfInterest, setAreaOfInterest] = useState<string | null>(null)
  const [category, setCategory] = useState<string | null>(null)

  const [areaOfInterestValue, setAreaOfInterestValue] = useState<string | null>(null)
  const [categoryValue, setCategoryValue] = useState<string | null>(null)

  const canContinueToAdvancedPreferences = useMemo(() => {
    return !!areaOfInterest
  }, [areaOfInterest])

  const canContinueToResults = useMemo(() => {
    return canContinueToAdvancedPreferences && !!category
  }, [canContinueToAdvancedPreferences, category])

  return useMemo(
    () => ({
      areaOfInterest,
      setAreaOfInterest,
      category,
      setCategory,
      areaOfInterestValue,
      setAreaOfInterestValue,
      categoryValue,
      setCategoryValue,
      canContinueToAdvancedPreferences,
      canContinueToResults
    }),
    [
      areaOfInterest,
      setAreaOfInterest,
      category,
      setCategory,
      areaOfInterestValue,
      setAreaOfInterestValue,
      categoryValue,
      setCategoryValue,
      canContinueToAdvancedPreferences,
      canContinueToResults
    ]
  )
}
