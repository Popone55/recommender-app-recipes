import { Autocomplete } from '@components/organisms/Autocomplete/Autocomplete'
import { useRecipesSearch } from '@features/RecipesSearch/context/useRecipesSearch'
import { useCategories } from '@hooks/api/query/useCategories'
import type { CategoriesListResponse } from '@plugins/api/interfaces/recipes'
import { type FC } from 'react'

export const CategoryAutocomplete: FC = () => {
  const query = useCategories()
  const { setCategory, categoryValue, setCategoryValue } = useRecipesSearch()

  return (
    <Autocomplete<CategoriesListResponse, string>
      label="Category"
      placeholder="Search for a category"
      errorText="Something went wrong, retry later."
      value={categoryValue ?? ''}
      onChange={setCategoryValue}
      onSelect={setCategory}
      query={query}
      getOptions={(data) => data.meals.map((category) => category.strCategory)}
      getOptionLabel={(option) => option}
    />
  )
}
