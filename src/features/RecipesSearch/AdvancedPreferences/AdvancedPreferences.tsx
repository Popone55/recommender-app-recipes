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
import { IngredientAutocomplete } from './IngredientAutocomplete/IngredientAutocomplete'

export const AdvancedPreferences = () => {
  const {
    category,
    setCategory,
    setCategoryValue,
    ingredient,
    setIngredient,
    setIngredientValue,
    canContinueToResults,
    canContinueToAdvancedPreferences
  } = useRecipesSearch()
  const navigate = useNavigate()

  const onClearCategory = useCallback(() => {
    setCategory(null)
    setCategoryValue(null)
  }, [setCategory, setCategoryValue])

  const onClearIngredient = useCallback(() => {
    setIngredient(null)
    setIngredientValue(null)
  }, [setIngredient, setIngredientValue])

  const backToBasicPreferences = useCallback(() => {
    navigate({ to: '/recipes/search/basic-preferences' })
  }, [navigate])

  useEffectOnceWhen(() => {
    if (!canContinueToAdvancedPreferences) {
      backToBasicPreferences()
    }
  })

  return (
    <SearchSection
      titleEl={
        <Typography
          size="xl"
          weight="bold">
          Let's define your advanced preferences
        </Typography>
      }
      selectionEl={
        (category || ingredient) && (
          <>
            {!!category && (
              <PillButton
                onClick={onClearCategory}
                suffix={<X size={16} />}>
                {category}
              </PillButton>
            )}
            {!!ingredient && (
              <PillButton
                onClick={onClearIngredient}
                suffix={<X size={16} />}>
                {ingredient}
              </PillButton>
            )}
          </>
        )
      }
      actionsEl={
        <>
          <Button
            variant="neutral"
            size="medium"
            onClick={backToBasicPreferences}>
            Back
          </Button>
          {canContinueToResults && (
            <Button
              variant="purple"
              size="medium"
              onClick={() => navigate({ to: '/recipes/search/results' })}>
              Continue
            </Button>
          )}
        </>
      }>
      <CategoryAutocomplete />
      <IngredientAutocomplete />
    </SearchSection>
  )
}
