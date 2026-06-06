import type { FeedbackItem } from '@features/History/context/HistoryContext'
import { useHistoryContext } from '@features/History/context/useHistoryContext'
import { useSearchStepsData } from '@hooks/useSearchStepsData/useSearchStepsData'
import type { RecipeItem } from '@plugins/api/interfaces/recipes'
import { useCallback, useMemo, type FC, type ReactNode } from 'react'
import { RecipesSearchContext } from './RecipesSearchContext'

export const RecipesSearchProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const {
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
  } = useSearchStepsData()

  const { addFeedbackItem } = useHistoryContext()

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

      addFeedbackItem(feedbackItem)
    },
    [areaOfInterest, category, addFeedbackItem]
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
    ]
  )

  return <RecipesSearchContext value={contextValue}>{children}</RecipesSearchContext>
}
