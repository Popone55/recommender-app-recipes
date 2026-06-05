import { Button } from '@components/atoms/Button/Button'
import { Typography } from '@components/atoms/Typography/Typography'
import { useRecipes } from '@hooks/api/query/useRecipes'
import { useRandomItem } from '@hooks/useRandomItem'
import type { RecipeItem } from '@plugins/api/interfaces/recipes'
import { Navigate, useNavigate } from '@tanstack/react-router'
import { type FC } from 'react'
import { useRecipesSearch } from '../context/useRecipesSearch'
import { RecipeItemCard } from '../RecipeItemCard/RecipeItemCard'
import { RecipeItemCardSkeleton } from '../RecipeItemCard/RecipeItemCardSkeleton'
import { SearchSection } from '../SearchSection/SearchSection'
import style from './Results.module.css'

const ResultsContent: FC<{
  areaOfInterest: string
  category: string
  ingredient: string
}> = ({ areaOfInterest, category, ingredient }) => {
  const { data, isLoading, error } = useRecipes({ areaOfInterest, category, ingredient })
  const { item, pickAnother } = useRandomItem<RecipeItem>(data?.meals)

  const navigate = useNavigate()

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
            variant="neutral"
            size="medium"
            onClick={() => navigate({ to: '/' })}>
            Back
          </Button>
          <Button
            variant="purple"
            size="medium"
            disabled={isLoading || !data?.meals.length}
            onClick={pickAnother}>
            Try another
          </Button>
        </>
      }>
      <div>
        {error && (
          <div className={style.error}>
            <Typography
              size="m"
              weight="bold">
              An error occurred while fetching the recipes. Please try again later.
            </Typography>
          </div>
        )}
        {!error &&
          (isLoading || !item ? <RecipeItemCardSkeleton /> : <RecipeItemCard recipe={item} />)}
      </div>
    </SearchSection>
  )
}

export const Results = () => {
  const { areaOfInterest, category, ingredient } = useRecipesSearch()

  if (!areaOfInterest || !category || !ingredient) {
    return <Navigate to="/recipes/search/advanced-preferences" />
  }

  return (
    <ResultsContent
      areaOfInterest={areaOfInterest}
      category={category}
      ingredient={ingredient}
    />
  )
}
