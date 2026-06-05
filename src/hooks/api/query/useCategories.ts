import { REST_API } from '@plugins/api/api'
import { fetcher } from '@plugins/api/fetcher'
import type { CategoriesListResponse } from '@plugins/api/interfaces/recipes'
import { useQuery } from '@tanstack/react-query'

const { categories } = REST_API.RECIPES

export const useCategories = () => {
  const { data, isLoading, error } = useQuery<CategoriesListResponse>({
    queryKey: categories.cacheKey,
    queryFn: () => fetcher(categories.path, { method: categories.method }),
    staleTime: categories.staleTime
  })

  return { data, isLoading, error }
}
