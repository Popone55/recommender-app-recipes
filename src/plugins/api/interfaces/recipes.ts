export interface MealCategory {
  idCategory: string
  strCategory: string
  strCategoryThumb: string
  strCategoryDescription: string
}

export interface Category {
  strCategory: string
}

export interface Area {
  strArea: string
  strCountry: string
}

export interface Ingredient {
  idIngredient: string
  strIngredient: string
  strDescription: string
  strType: string
  strThumb: string
}

export type MealCategoryListResponse = {
  categories: MealCategory[]
}

export type CategoriesListResponse = {
  meals: MealCategory[]
}

export type AreasListResponse = {
  meals: Area[]
}

export type IngredientsListResponse = {
  meals: Ingredient[]
}
