import type { ApiFeature } from '../interfaces/api'

export const RECIPES = {
  categories: {
    path: '/list.php?c=list',
    method: 'GET',
    cacheKey: ['categories'],
    staleTime: Infinity
  },
  areas: {
    path: '/list.php?a=list',
    method: 'GET',
    cacheKey: ['areas'],
    staleTime: Infinity
  },
  ingredients: {
    path: '/list.php?i=list',
    method: 'GET',
    cacheKey: ['ingredients'],
    staleTime: Infinity
  },
  recipes: {
    path: (areaOfInterest: string, category: string, ingredient: string) => {
      return `/filter.php?a=${areaOfInterest}&c=${category}&i=${ingredient}`
    },
    method: 'GET',
    cacheKey: (areaOfInterest: string, category: string, ingredient: string) => [
      'recipes',
      areaOfInterest,
      category,
      ingredient
    ],
    staleTime: Infinity
  }
} as const satisfies ApiFeature
