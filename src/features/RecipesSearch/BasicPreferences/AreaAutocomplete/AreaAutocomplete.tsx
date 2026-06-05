import { Autocomplete } from '@components/organisms/Autocomplete/Autocomplete'
import { useRecipesSearch } from '@features/RecipesSearch/context/useRecipesSearch'
import { useAreas } from '@hooks/api/query/useAreas'
import type { AreasListResponse } from '@plugins/api/interfaces/recipes'
import { type FC } from 'react'

export const AreaAutocomplete: FC = () => {
  const query = useAreas()
  const { setAreaOfInterest, areaOfInterestValue, setAreaOfInterestValue } = useRecipesSearch()

  return (
    <Autocomplete<AreasListResponse, string>
      label="Area of interest"
      placeholder="Search for an area of interest"
      errorText="Something went wrong, retry later."
      value={areaOfInterestValue ?? ''}
      onChange={setAreaOfInterestValue}
      onSelect={setAreaOfInterest}
      query={query}
      getOptions={(data) => data.meals.map((meal) => meal.strArea)}
      getOptionLabel={(option) => option}
    />
  )
}
