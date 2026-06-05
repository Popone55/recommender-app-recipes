import { Autocomplete } from '@components/organisms/Autocomplete/Autocomplete'
import { useRecipesSearch } from '@features/RecipesSearch/context/useRecipesSearch'
import { useIngredients } from '@hooks/api/query/useIngredients'
import type { IngredientsListResponse } from '@plugins/api/interfaces/recipes'
import { type FC } from 'react'

export const IngredientAutocomplete: FC = () => {
  const query = useIngredients()
  const { setIngredient, ingredientValue, setIngredientValue } = useRecipesSearch()

  return (
    <Autocomplete<IngredientsListResponse, string>
      label="Ingredient"
      placeholder="Search for an ingredient"
      errorText="Something went wrong, retry later."
      value={ingredientValue ?? ''}
      onChange={setIngredientValue}
      onSelect={setIngredient}
      query={query}
      getOptions={(data) => data.meals.map((ingredient) => ingredient.strIngredient)}
      getOptionLabel={(option) => option}
    />
  )
}
