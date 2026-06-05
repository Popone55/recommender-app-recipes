import type { RecipeItem } from '@plugins/api/interfaces/recipes'
import { createContext } from 'react'

export interface RecipesSearchContextValue {
  areaOfInterest: string | null
  setAreaOfInterest: (areaOfInterest: string | null) => void
  canContinueToAdvancedPreferences: boolean
  canContinueToResults: boolean
  category: string | null
  setCategory: (category: string | null) => void
  areaOfInterestValue: string | null
  setAreaOfInterestValue: (areaOfInterestValue: string | null) => void
  categoryValue: string | null
  setCategoryValue: (categoryValue: string | null) => void
  saveFeedback: (recipe: RecipeItem, feedback: 'like' | 'dislike') => void
}

export const RecipesSearchContext = createContext<RecipesSearchContextValue>(
  undefined as unknown as RecipesSearchContextValue
)
