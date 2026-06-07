import { Button } from '@components/atoms/Button/Button'
import { Typography } from '@components/atoms/Typography/Typography'
import { useRecipes } from '@hooks/api/query/useRecipes'
import { useRandomItem } from '@hooks/useRandomItem'
import type { RecipeItem } from '@plugins/api/interfaces/recipes'
import { Navigate, useNavigate } from '@tanstack/react-router'
import { Shuffle } from 'lucide-react'
import { useMemo, type FC } from 'react'
import { useRecipesSearch } from '../context/useRecipesSearch'
import { RecipeItemCard } from '../RecipeItemCard/RecipeItemCard'
import { RecipeItemCardSkeleton } from '../RecipeItemCard/RecipeItemCardSkeleton'
import { SearchSection } from '../SearchSection/SearchSection'
import style from './Results.module.css'

const ResultsContent: FC<{
  areaOfInterest: string
  category: string
}> = ({ areaOfInterest, category }) => {
  const { data, isLoading, error } = useRecipes({ areaOfInterest, category })
  const { item, pickAnother } = useRandomItem<RecipeItem | null>(data?.meals)

  const navigate = useNavigate()

  const showEmptyState = useMemo(
    () => !isLoading && !error && !data?.meals?.length,
    [isLoading, error, data?.meals]
  )

  const showError = useMemo(() => !isLoading && error, [isLoading, error])

  const canTryAnother = useMemo(() => {
    if (!data?.meals?.length) return false
    return data.meals.length > 1
  }, [data])

  return (
    <SearchSection
      titleEl={
        <Typography
          size="xl"
          weight="bold">
          Here are the recipes we found for you
        </Typography>
      }
      descriptionEl={
        <Typography>
          Take a look at the recipes we found for you and select the one you like the most.
        </Typography>
      }
      actionsEl={
        <>
          <Button
            aria-label="Back to advanced preferences"
            variant="neutral"
            size="medium"
            onClick={() => navigate({ to: '/recipes/search/advanced-preferences' })}>
            Back
          </Button>
          <Button
            aria-label="Try another recipe"
            startIcon={<Shuffle size={16} />}
            variant="purple"
            size="medium"
            disabled={!canTryAnother}
            onClick={pickAnother}>
            Try another
          </Button>
        </>
      }>
      <div>
        {showError && (
          <Typography
            className={style.error}
            size="m"
            weight="bold">
            An error occurred while fetching the recipes. Please try again later.
          </Typography>
        )}
        {showEmptyState && (
          <Typography
            size="m"
            weight="bold">
            No recipes found. Please try again with different preferences.
          </Typography>
        )}
        {item && <RecipeItemCard recipe={item} />}
        {isLoading && <RecipeItemCardSkeleton />}
      </div>
    </SearchSection>
  )
}

export const Results = () => {
  const { areaOfInterest, category } = useRecipesSearch()

  if (!areaOfInterest || !category) {
    return <Navigate to="/recipes/search/advanced-preferences" />
  }

  return (
    <ResultsContent
      areaOfInterest={areaOfInterest}
      category={category}
    />
  )
}
