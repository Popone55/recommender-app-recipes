import type { ApiFeature } from '../interfaces/api'

export const RECIPES = {
  mealCategories: {
    path: '/categories',
    method: 'GET',
    cacheKey: ['mealCategories'],
    staleTime: Infinity
  },
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
  }
} as const satisfies ApiFeature
