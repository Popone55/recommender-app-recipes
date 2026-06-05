import { createContext } from 'react'

export interface RecipesSearchContextValue {
  areaOfInterest: string | null
  setAreaOfInterest: (areaOfInterest: string | null) => void
  canContinueToAdvancedPreferences: boolean
  canContinueToResults: boolean
  category: string | null
  setCategory: (category: string | null) => void
  ingredient: string | null
  setIngredient: (ingredient: string | null) => void
  areaOfInterestValue: string | null
  setAreaOfInterestValue: (areaOfInterestValue: string | null) => void
  categoryValue: string | null
  setCategoryValue: (categoryValue: string | null) => void
  ingredientValue: string | null
  setIngredientValue: (ingredientValue: string | null) => void
  resetAdvancedPreferences: () => void
}

export const RecipesSearchContext = createContext<RecipesSearchContextValue>(
  undefined as unknown as RecipesSearchContextValue
)
