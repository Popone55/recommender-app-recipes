import { Typography } from '@components/atoms/Typography/Typography'
import { AreasAutocomplete } from './AreasAutocomplete/AreasAutocomplete'

export const BasicPreferences = () => {
  return (
    <div>
      <Typography
        size="xl"
        weight="bold">
        Let's define your area of interest preferences
      </Typography>
      <Typography>We'll use this to find recipes that match your interests.</Typography>
      <AreasAutocomplete />
    </div>
  )
}
