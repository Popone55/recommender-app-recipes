import { REST_API } from '@plugins/api/api'
import { fetcher } from '@plugins/api/fetcher'
import type { RecipeDetailsResponse } from '@plugins/api/interfaces/recipes'
import { useQuery } from '@tanstack/react-query'

const { recipeDetails } = REST_API.RECIPES

export const useRecipeDetails = (id: string) => {
  const { data, isLoading, error } = useQuery<RecipeDetailsResponse>({
    queryKey: recipeDetails.cacheKey(id),
    queryFn: () => fetcher(recipeDetails.path(id), { method: recipeDetails.method }),
    staleTime: recipeDetails.staleTime
  })

  return { data, isLoading, error }
}
