import { Autocomplete } from '@components/organisms/Autocomplete/Autocomplete'
import { useRecipesSearch } from '@features/RecipesSearch/context/useRecipesSearch'
import { useAreas } from '@hooks/api/query/useAreas'
import type { AreasListResponse } from '@plugins/api/interfaces/recipes'
import { useState, type FC } from 'react'

export const AreasAutocomplete: FC = () => {
  const query = useAreas()
  const { areaOfInterest, setAreaOfInterest } = useRecipesSearch()
  const [value, setValue] = useState<string | null>(areaOfInterest)

  return (
    <div>
      <Autocomplete<AreasListResponse, string>
        label="Area of interest"
        placeholder="Search for an area of interest"
        errorText="Something went wrong, retry later."
        value={value ?? ''}
        onChange={setValue}
        onSelect={setAreaOfInterest}
        query={query}
        getOptions={(data) => data.meals.map((meal) => meal.strArea)}
        getOptionLabel={(option) => option}
      />
    </div>
  )
}
