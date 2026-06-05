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

export interface RecipeItem {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strArea: string
  strCountry: string
}

export type CategoriesListResponse = {
  meals: Category[]
}

export type AreasListResponse = {
  meals: Area[]
}

export type IngredientsListResponse = {
  meals: Ingredient[]
}

export type RecipesListResponse = {
  meals: RecipeItem[] | null
}

export type SearchRecipesListResponse = {
  meals: RecipeItem[] | null
}
