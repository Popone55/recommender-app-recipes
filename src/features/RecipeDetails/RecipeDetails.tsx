import { PillButton } from '@components/atoms/PillButton/PillButton'
import { Card } from '@components/atoms/Typography/Card/Card'
import { Typography } from '@components/atoms/Typography/Typography'
import { ImageLoader } from '@components/molecules/ImageLoader/ImageLoader'
import { useRecipeDetails } from '@hooks/api/query/useRecipeDetails'
import type { RecipeDetails as RecipeDetailsData } from '@plugins/api/interfaces/recipes'
import { useMemo, type FC } from 'react'
import { getRecipeIngredients } from './getRecipeIngredients'
import { RecipeDetailsSkeleton } from './RecipeDetailsSkeleton'
import style from './RecipeDetails.module.css'

const getRecipeTags = (recipe: RecipeDetailsData) =>
  recipe.strTags
    ?.split(',')
    .map((tag) => tag.trim())
    .filter(Boolean) ?? []

export const RecipeDetails: FC<{ id: string }> = ({ id }) => {
  const { data, isLoading, error } = useRecipeDetails(id)
  const recipe = data?.meals?.[0]

  const ingredients = useMemo(() => (recipe ? getRecipeIngredients(recipe) : []), [recipe])
  const tags = useMemo(() => (recipe ? getRecipeTags(recipe) : []), [recipe])

  const showError = useMemo(() => !isLoading && error, [isLoading, error])

  const showEmptyState = useMemo(
    () => !isLoading && !error && !recipe,
    [isLoading, error, recipe]
  )

  const hasInfoTags = useMemo(
    () => !!recipe?.strCategory || !!recipe?.strArea || !!recipe?.strCountry || tags.length > 0,
    [recipe, tags]
  )

  const hasLinks = useMemo(
    () =>
      !!recipe?.strYoutube?.trim() ||
      !!recipe?.strSource?.trim() ||
      !!recipe?.strImageSource?.trim(),
    [recipe]
  )

  if (isLoading) {
    return (
      <div className={style.root}>
        <RecipeDetailsSkeleton />
      </div>
    )
  }

  return (
    <div className={style.root}>
      <Card className={style.card}>
        {showError && (
          <Typography
            className={style.error}
            size="m"
            weight="bold">
            An error occurred while fetching the recipe details. Please try again later.
          </Typography>
        )}
        {showEmptyState && (
          <Typography
            size="m"
            weight="bold">
            Recipe not found.
          </Typography>
        )}
        {recipe && (
          <>
            <div className={style.header}>
              <Typography
                size="xl"
                weight="bold">
                {recipe.strMeal}
              </Typography>
              {!!recipe.strMealAlternate && (
                <Typography
                  size="m"
                  weight="medium">
                  {recipe.strMealAlternate}
                </Typography>
              )}
            </div>

            <div className={style.content}>
              <ImageLoader
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                size={250}
              />
              {hasInfoTags && (
                <div className={style.info}>
                  <div className={style.infoTags}>
                    {!!recipe.strCategory && (
                      <div className={style.infoTag}>
                        <Typography
                          size="s"
                          weight="bold">
                          Category:
                        </Typography>
                        <PillButton>{recipe.strCategory}</PillButton>
                      </div>
                    )}
                    {!!recipe.strArea && (
                      <div className={style.infoTag}>
                        <Typography
                          size="s"
                          weight="bold">
                          Area:
                        </Typography>
                        <PillButton>{recipe.strArea}</PillButton>
                      </div>
                    )}
                    {!!recipe.strCountry && (
                      <div className={style.infoTag}>
                        <Typography
                          size="s"
                          weight="bold">
                          Country:
                        </Typography>
                        <PillButton>{recipe.strCountry}</PillButton>
                      </div>
                    )}
                    {tags.length > 0 && (
                      <div className={style.infoTag}>
                        <Typography
                          size="s"
                          weight="bold">
                          Tags:
                        </Typography>
                        {tags.map((tag) => (
                          <PillButton key={tag}>{tag}</PillButton>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {ingredients.length > 0 && (
              <div className={style.section}>
                <Typography
                  size="l"
                  weight="bold">
                  Ingredients
                </Typography>
                <ul className={style.ingredientsList}>
                  {ingredients.map(({ ingredient, measure }, index) => (
                    <Typography
                      key={`${ingredient}-${measure}-${index}`}
                      as="li"
                      size="m">
                      {measure ? `${measure} ${ingredient}` : ingredient}
                    </Typography>
                  ))}
                </ul>
              </div>
            )}

            {!!recipe.strInstructions?.trim() && (
              <div className={style.section}>
                <Typography
                  size="l"
                  weight="bold">
                  Instructions
                </Typography>
                <Typography
                  className={style.instructions}
                  size="m">
                  {recipe.strInstructions.trim()}
                </Typography>
              </div>
            )}

            {hasLinks && (
              <div className={style.section}>
                <Typography
                  size="l"
                  weight="bold">
                  Links
                </Typography>
                <div className={style.links}>
                  {!!recipe.strYoutube?.trim() && (
                    <a
                      className={style.link}
                      href={recipe.strYoutube.trim()}
                      rel="noopener noreferrer"
                      target="_blank">
                      <Typography
                        size="m"
                        weight="medium">
                        Watch on YouTube
                      </Typography>
                    </a>
                  )}
                  {!!recipe.strSource?.trim() && (
                    <a
                      className={style.link}
                      href={recipe.strSource.trim()}
                      rel="noopener noreferrer"
                      target="_blank">
                      <Typography
                        size="m"
                        weight="medium">
                        View original recipe
                      </Typography>
                    </a>
                  )}
                  {!!recipe.strImageSource?.trim() && (
                    <a
                      className={style.link}
                      href={recipe.strImageSource.trim()}
                      rel="noopener noreferrer"
                      target="_blank">
                      <Typography
                        size="m"
                        weight="medium">
                        View image source
                      </Typography>
                    </a>
                  )}
                </div>
              </div>
            )}

            {!!recipe.dateModified?.trim() && (
              <Typography
                size="s"
                weight="medium">
                Last updated: {recipe.dateModified.trim()}
              </Typography>
            )}
          </>
        )}
      </Card>
    </div>
  )
}
