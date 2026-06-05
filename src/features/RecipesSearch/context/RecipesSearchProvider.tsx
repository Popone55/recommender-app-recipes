import type { FeedbackItem, RecipeItem } from '@plugins/api/interfaces/recipes'
import { getLocalStorageValue, LocalStorageKey, setLocalStorageValue } from '@plugins/localStorage'
import { useCallback, useMemo, useState, type FC, type ReactNode } from 'react'
import { RecipesSearchContext } from './RecipesSearchContext'

export const RecipesSearchProvider: FC<{ children: ReactNode }> = ({ children }) => {
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

  const saveFeedback = useCallback(
    (recipe: RecipeItem, feedback: 'like' | 'dislike') => {
      if (!areaOfInterest || !category) return

      const feedbackItem = {
        id: recipe.idMeal,
        title: recipe.strMeal,
        image: recipe.strMealThumb,
        feedback,
        inputs: {
          areaOfInterest,
          category
        },
        createdAt: Date.now()
      } satisfies FeedbackItem

      const feedbackItems = getLocalStorageValue<FeedbackItem[]>(LocalStorageKey.FEEDBACK_ITEMS)
      setLocalStorageValue(LocalStorageKey.FEEDBACK_ITEMS, [...(feedbackItems ?? []), feedbackItem])
    },
    [areaOfInterest, category]
  )

  const contextValue = useMemo(
    () => ({
      areaOfInterest,
      setAreaOfInterest,
      canContinueToAdvancedPreferences,
      canContinueToResults,
      category,
      setCategory,
      areaOfInterestValue,
      setAreaOfInterestValue,
      categoryValue,
      setCategoryValue,
      saveFeedback
    }),
    [
      areaOfInterest,
      canContinueToAdvancedPreferences,
      canContinueToResults,
      category,
      areaOfInterestValue,
      categoryValue,
      saveFeedback
    ]
  )

  return <RecipesSearchContext value={contextValue}>{children}</RecipesSearchContext>
}
