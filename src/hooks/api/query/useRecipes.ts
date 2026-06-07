import { REST_API } from '@plugins/api/api'
import { fetcher } from '@plugins/api/fetcher'
import type { RecipesListResponse } from '@plugins/api/interfaces/recipes'
import { useQuery } from '@tanstack/react-query'

const { recipes } = REST_API.RECIPES

export const useRecipes = ({
  areaOfInterest,
  category
}: {
  areaOfInterest: string
  category: string
}) => {
  const { data, isLoading, error } = useQuery<RecipesListResponse>({
    queryKey: recipes.cacheKey(areaOfInterest, category),
    queryFn: async () => {
      const response = await fetcher<RecipesListResponse>(recipes.path(areaOfInterest, category), {
        method: recipes.method
      })

      // Filtering by two criteria at the same time is not possible with the API, so we filter here by the only field returned by the API.
      return {
        meals: response?.meals?.filter((meal) => meal.strArea === areaOfInterest) ?? null
      }
    },
    staleTime: recipes.staleTime
  })

  return { data, isLoading, error }
}
