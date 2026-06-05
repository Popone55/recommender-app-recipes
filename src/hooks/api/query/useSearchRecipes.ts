import { REST_API } from '@plugins/api/api'
import { fetcher } from '@plugins/api/fetcher'
import type { SearchRecipesListResponse } from '@plugins/api/interfaces/recipes'
import { useQuery } from '@tanstack/react-query'

const { searchRecipes } = REST_API.RECIPES

export const useSearchRecipes = (query: string) => {
  const { data, isLoading, error } = useQuery<SearchRecipesListResponse>({
    queryKey: searchRecipes.cacheKey(query),
    queryFn: () =>
      fetcher<SearchRecipesListResponse>(searchRecipes.path(query), {
        method: searchRecipes.method
      }),
    staleTime: searchRecipes.staleTime
  })

  return { data, isLoading, error }
}
