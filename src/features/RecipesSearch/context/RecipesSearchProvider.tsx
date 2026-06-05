import type { FeedbackItem } from '@features/History/context/HistoryContext'
import { useHistoryContext } from '@features/History/context/useHistoryContext'
import type { RecipeItem } from '@plugins/api/interfaces/recipes'
import { useCallback, useMemo, useState, type FC, type ReactNode } from 'react'
import { RecipesSearchContext } from './RecipesSearchContext'

export const RecipesSearchProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [areaOfInterest, setAreaOfInterest] = useState<string | null>(null)
  const [category, setCategory] = useState<string | null>(null)
  const { pushFeedbackItem } = useHistoryContext()

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

      pushFeedbackItem(feedbackItem)
    },
    [areaOfInterest, category, pushFeedbackItem]
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
