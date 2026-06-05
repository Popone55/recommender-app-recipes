import { useCallback, useMemo, useState, type FC, type ReactNode } from 'react'
import { RecipesSearchContext } from './RecipesSearchContext'

export const RecipesSearchProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [areaOfInterest, setAreaOfInterest] = useState<string | null>(null)
  const [category, setCategory] = useState<string | null>(null)
  const [ingredient, setIngredient] = useState<string | null>(null)

  const [areaOfInterestValue, setAreaOfInterestValue] = useState<string | null>(null)
  const [categoryValue, setCategoryValue] = useState<string | null>(null)
  const [ingredientValue, setIngredientValue] = useState<string | null>(null)

  const canContinueToAdvancedPreferences = useMemo(() => {
    return !!areaOfInterest
  }, [areaOfInterest])

  const canContinueToResults = useMemo(() => {
    return canContinueToAdvancedPreferences && !!category && !!ingredient
  }, [canContinueToAdvancedPreferences, category, ingredient])

  const resetAdvancedPreferences = useCallback(() => {
    setCategory(null)
    setCategoryValue(null)
    setIngredient(null)
    setIngredientValue(null)
  }, [])

  const contextValue = useMemo(
    () => ({
      areaOfInterest,
      setAreaOfInterest,
      canContinueToAdvancedPreferences,
      canContinueToResults,
      category,
      setCategory,
      ingredient,
      setIngredient,
      areaOfInterestValue,
      setAreaOfInterestValue,
      categoryValue,
      setCategoryValue,
      ingredientValue,
      setIngredientValue,
      resetAdvancedPreferences
    }),
    [
      areaOfInterest,
      canContinueToAdvancedPreferences,
      canContinueToResults,
      category,
      ingredient,
      areaOfInterestValue,
      categoryValue,
      ingredientValue,
      resetAdvancedPreferences
    ]
  )

  return <RecipesSearchContext value={contextValue}>{children}</RecipesSearchContext>
}
