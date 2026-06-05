import { RECIPES } from './features/recipes'
import type { ApiSchema } from './interfaces/api'

export const REST_API = {
  RECIPES
} as const satisfies ApiSchema
