import { Autocomplete } from '@components/organisms/Autocomplete/Autocomplete'
import { useRecipesSearch } from '@features/RecipesSearch/context/useRecipesSearch'
import { useCategories } from '@hooks/api/query/useCategories'
import type { CategoriesListResponse } from '@plugins/api/interfaces/recipes'
import { useCallback, type FC } from 'react'

export const CategoryAutocomplete: FC = () => {
  const query = useCategories()
  const { setCategory, categoryValue, setCategoryValue } = useRecipesSearch()

  const getOptions = useCallback((data: CategoriesListResponse) => {
    return data.meals.map((category) => category.strCategory)
  }, [])

  const getOptionLabel = useCallback((option: string) => {
    return option
  }, [])

  return (
    <Autocomplete<CategoriesListResponse, string>
      label="Category"
      placeholder="Search for a category"
      errorText="Something went wrong, retry later."
      value={categoryValue ?? ''}
      onChange={setCategoryValue}
      onSelect={setCategory}
      query={query}
      getOptions={getOptions}
      getOptionLabel={getOptionLabel}
    />
  )
}
