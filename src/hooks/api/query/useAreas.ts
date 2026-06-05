import { REST_API } from '@plugins/api/api'
import { fetcher } from '@plugins/api/fetcher'
import type { AreasListResponse } from '@plugins/api/interfaces/recipes'
import { useQuery } from '@tanstack/react-query'

const { areas } = REST_API.RECIPES

export const useAreas = () => {
  const { data, isLoading, error } = useQuery<AreasListResponse>({
    queryKey: areas.cacheKey,
    queryFn: () => fetcher(areas.path, { method: areas.method }),
    staleTime: areas.staleTime
  })

  return { data, isLoading, error }
}
