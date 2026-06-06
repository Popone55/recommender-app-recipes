import type { RecipeDetails } from '@plugins/api/interfaces/recipes'

export const getRecipeTags = (recipe: RecipeDetails) =>
  recipe.strTags
    ?.split(',')
    .map((tag) => tag.trim())
    .filter(Boolean) ?? []
