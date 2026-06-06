import type { RecipeDetails } from '@plugins/api/interfaces/recipes'

export type RecipeIngredient = {
  ingredient: string
  measure: string
}

export const getRecipeIngredients = (recipe: RecipeDetails): RecipeIngredient[] => {
  const ingredients: RecipeIngredient[] = []

  for (let index = 1; index <= 20; index++) {
    const ingredient = recipe[`strIngredient${index}` as keyof RecipeDetails] as string
    const measure = recipe[`strMeasure${index}` as keyof RecipeDetails] as string

    if (ingredient?.trim()) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure?.trim() ?? ''
      })
    }
  }

  return ingredients
}
