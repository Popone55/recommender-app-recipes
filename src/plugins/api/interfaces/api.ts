type InvalidateQueries = string[] | string[][] | ((...args: never[]) => string[][] | string[])
type CacheKey = string[] | unknown[] | ((...args: never[]) => string[] | unknown[])

export type ApiSchema = Record<
  string,
  Record<
    string,
    | (ApiBaseItem & { method: 'GET' })
    | (ApiBaseItem & {
        method: 'POST' | 'PATCH' | 'DELETE' | 'PUT'
        invalidateQueries: InvalidateQueries
      })
  >
>

export type ApiFeature = Record<
  string,
  | (ApiBaseItem & { method: 'GET' })
  | (ApiBaseItem & {
      method: 'POST' | 'PATCH' | 'DELETE' | 'PUT'
      invalidateQueries: InvalidateQueries
    })
>

type ApiBaseItem = {
  path: ((...args: never[]) => string) | string
  cacheKey: CacheKey
  staleTime?: number
  gcTime?: number
}
