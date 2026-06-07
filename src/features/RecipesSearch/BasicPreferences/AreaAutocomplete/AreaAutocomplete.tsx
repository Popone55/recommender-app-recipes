import { Autocomplete } from '@components/organisms/Autocomplete/Autocomplete'
import { useRecipesSearch } from '@features/RecipesSearch/context/useRecipesSearch'
import { useAreas } from '@hooks/api/query/useAreas'
import type { AreasListResponse } from '@plugins/api/interfaces/recipes'
import { useCallback, type FC } from 'react'

export const AreaAutocomplete: FC = () => {
  const query = useAreas()
  const { setAreaOfInterest, areaOfInterestValue, setAreaOfInterestValue } = useRecipesSearch()

  const getOptions = useCallback((data: AreasListResponse) => {
    return data.meals.map((meal) => meal.strArea)
  }, [])

  const getOptionLabel = useCallback((option: string) => {
    return option
  }, [])

  return (
    <Autocomplete<AreasListResponse, string>
      label="Area"
      placeholder="Search for an area"
      errorText="Something went wrong, retry later."
      value={areaOfInterestValue ?? ''}
      onChange={setAreaOfInterestValue}
      onSelect={setAreaOfInterest}
      query={query}
      getOptions={getOptions}
      getOptionLabel={getOptionLabel}
    />
  )
}
