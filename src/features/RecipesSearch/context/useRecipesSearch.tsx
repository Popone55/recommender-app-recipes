import { useContext } from 'react'
import { RecipesSearchContext } from './RecipesSearchContext'

export const useRecipesSearch = () => {
  const context = useContext(RecipesSearchContext)
  if (!context) {
    throw new Error('useRecipesSearch must be used within a RecipesSearchProvider')
  }
  return context
}
