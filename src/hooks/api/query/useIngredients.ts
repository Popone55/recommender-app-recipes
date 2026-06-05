import { REST_API } from '@plugins/api/api'
import { fetcher } from '@plugins/api/fetcher'
import type { IngredientsListResponse } from '@plugins/api/interfaces/recipes'
import { useQuery } from '@tanstack/react-query'

const { ingredients } = REST_API.RECIPES

export const useIngredients = () => {
  const { data, isLoading, error } = useQuery<IngredientsListResponse>({
    queryKey: ingredients.cacheKey,
    queryFn: () => fetcher(ingredients.path, { method: ingredients.method }),
    staleTime: ingredients.staleTime
  })

  return { data, isLoading, error }
}
