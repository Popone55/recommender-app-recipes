import { Environment } from '@dictionaries/Environment.ts'
import { HttpError } from './interfaces/httpError'

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

interface FetchOptions<T = unknown> {
  method?: HTTPMethod
  data?: T
  headers?: HeadersInit
}

const throwErrorMessageFromResponse = async (response: Response) => {
  let errorBody: unknown
  try {
    errorBody = await response.json()
  } catch {
    errorBody = await response.text()
  }
  throw new HttpError('Request failed', response.status, errorBody)
}

export const fetcher = async <T>(
  path: string,
  { method = 'GET', data, headers }: FetchOptions<T>
) => {
  const options: RequestInit = {
    method,
    headers
  }

  if (data) {
    options.body = JSON.stringify(data)
  }

  const response = await fetch(Environment.apiUrl + path, options)

  if (!response.ok) {
    return await throwErrorMessageFromResponse(response)
  }

  try {
    return response.json() as PromiseLike<T>
  } catch {
    throw new Error('Invalid JSON response')
  }
}
