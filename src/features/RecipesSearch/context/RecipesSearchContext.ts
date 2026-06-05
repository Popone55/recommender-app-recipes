import { createContext } from 'react'

export interface RecipesSearchContextValue {
  areaOfInterest: string | null
  setAreaOfInterest: (areaOfInterest: string) => void
}

export const RecipesSearchContext = createContext<RecipesSearchContextValue>(
  undefined as unknown as RecipesSearchContextValue
)
