const { VITE_API_URL } = import.meta.env

export const Environment = {
  apiUrl: VITE_API_URL
} as const
