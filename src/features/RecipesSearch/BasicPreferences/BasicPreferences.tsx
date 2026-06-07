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
      descriptionEl={
        <Typography>
          We'll use this to find recipes that match your preferred area.
          <br />
          <b>Tip: filter by Italian + Pasta to get the best results.</b>
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
            aria-label="Back to home"
            variant="neutral"
            size="medium"
            onClick={() => navigate({ to: '/' })}>
            Back
          </Button>
          {canContinueToAdvancedPreferences && (
            <Button
              aria-label="Continue to advanced preferences"
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
