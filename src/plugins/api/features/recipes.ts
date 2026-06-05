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
    path: (areaOfInterest: string, category: string) => {
      return `/filter.php?a=${areaOfInterest}&c=${category}`
    },
    method: 'GET',
    cacheKey: (areaOfInterest: string, category: string) => ['recipes', areaOfInterest, category],
    staleTime: Infinity
  },
  searchRecipes: {
    path: (query: string) => {
      return `/search.php?s=${query}`
    },
    method: 'GET',
    cacheKey: (query: string) => ['searchRecipes', query],
    staleTime: Infinity
  },
  recipeDetails: {
    path: (id: string) => {
      return `/lookup.php?i=${id}`
    },
    method: 'GET',
    cacheKey: (id: string) => ['recipeDetails', id],
    staleTime: Infinity
  }
} as const satisfies ApiFeature
