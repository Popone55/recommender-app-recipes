import { REST_API } from '@plugins/api/api'
import { fetcher } from '@plugins/api/fetcher'
import type { RecipesListResponse } from '@plugins/api/interfaces/recipes'
import { useQuery } from '@tanstack/react-query'

const { recipes } = REST_API.RECIPES

export const useRecipes = ({
  areaOfInterest,
  category,
  ingredient
}: {
  areaOfInterest: string
  category: string
  ingredient: string
}) => {
  const { data, isLoading, error } = useQuery<RecipesListResponse>({
    queryKey: recipes.cacheKey(areaOfInterest, category, ingredient),
    queryFn: () =>
      fetcher(recipes.path(areaOfInterest, category, ingredient), { method: recipes.method }),
    staleTime: recipes.staleTime
  })

  return { data, isLoading, error }
}
