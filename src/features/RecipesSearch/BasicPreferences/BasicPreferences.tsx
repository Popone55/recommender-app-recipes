import { Button } from '@components/atoms/Button/Button'
import { PillButton } from '@components/atoms/PillButton/PillButton'
import { Typography } from '@components/atoms/Typography/Typography'
import { useNavigate } from '@tanstack/react-router'
import { X } from 'lucide-react'
import { useCallback } from 'react'
import { useRecipesSearch } from '../context/useRecipesSearch'
import { SearchSection } from '../SearchSection/SearchSection'
import { AreaAutocomplete } from './AreaAutocomplete/AreaAutocomplete'

export const BasicPreferences = () => {
  const {
    areaOfInterest,
    setAreaOfInterest,
    setAreaOfInterestValue,
    canContinueToAdvancedPreferences
  } = useRecipesSearch()
  const navigate = useNavigate()

  const onClearAreaOfInterest = useCallback(() => {
    setAreaOfInterest(null)
    setAreaOfInterestValue(null)
  }, [setAreaOfInterest, setAreaOfInterestValue])

  return (
    <SearchSection
      titleEl={
        <Typography
          size="xl"
          weight="bold">
          Let's define your base preferences
        </Typography>
      }
      selectionEl={
        !!areaOfInterest && (
          <PillButton
            onClick={onClearAreaOfInterest}
            suffix={<X size={16} />}>
            {areaOfInterest}
          </PillButton>
        )
      }
      actionsEl={
        <>
          <Button
            variant="neutral"
            size="medium"
            onClick={() => navigate({ to: '/' })}>
            Back
          </Button>
          {canContinueToAdvancedPreferences && (
            <Button
              variant="purple"
              size="medium"
              onClick={() => navigate({ to: '/recipes/search/advanced-preferences' })}>
              Continue
            </Button>
          )}
        </>
      }>
      <AreaAutocomplete />
    </SearchSection>
  )
}
