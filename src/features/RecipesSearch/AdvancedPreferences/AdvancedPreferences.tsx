import { Button } from '@components/atoms/Button/Button'
import { PillButton } from '@components/atoms/PillButton/PillButton'
import { Typography } from '@components/atoms/Typography/Typography'
import { useEffectOnceWhen } from '@hooks/useEffectOnceWhen'
import { useNavigate } from '@tanstack/react-router'
import { X } from 'lucide-react'
import { useCallback } from 'react'
import { useRecipesSearch } from '../context/useRecipesSearch'
import { SearchSection } from '../SearchSection/SearchSection'
import { CategoryAutocomplete } from './CategoryAutocomplete/CategoryAutocomplete'

export const AdvancedPreferences = () => {
  const {
    category,
    setCategory,
    setCategoryValue,
    canContinueToResults,
    canContinueToAdvancedPreferences
  } = useRecipesSearch()
  const navigate = useNavigate()

  const onClearCategory = useCallback(() => {
    setCategory(null)
    setCategoryValue(null)
  }, [setCategory, setCategoryValue])

  const backToBasicPreferences = useCallback(() => {
    navigate({ to: '/recipes/search/basic-preferences' })
  }, [navigate])

  useEffectOnceWhen(() => {
    backToBasicPreferences()
  }, !canContinueToAdvancedPreferences)

  return (
    <SearchSection
      titleEl={
        <Typography
          size="xl"
          weight="bold">
          Let's define your advanced preferences
        </Typography>
      }
      descriptionEl={
        <Typography>We'll use this to find recipes that match your preferred category.</Typography>
      }
      selectionEl={
        !!category && (
          <PillButton
            onClick={onClearCategory}
            suffix={<X size={16} />}>
            {category}
          </PillButton>
        )
      }
      actionsEl={
        <>
          <Button
            aria-label="Back to basic preferences"
            variant="neutral"
            size="medium"
            onClick={backToBasicPreferences}>
            Back
          </Button>
          {canContinueToResults && (
            <Button
              aria-label="Continue to results"
              variant="purple"
              size="medium"
              onClick={() => navigate({ to: '/recipes/search/results' })}>
              Continue
            </Button>
          )}
        </>
      }>
      <CategoryAutocomplete />
    </SearchSection>
  )
}
