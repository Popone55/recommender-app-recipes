import { Button } from '@components/atoms/Button/Button'
import { PillButton } from '@components/atoms/PillButton/PillButton'
import { Card } from '@components/atoms/Typography/Card/Card'
import { Typography } from '@components/atoms/Typography/Typography'
import { ImageLoader } from '@components/molecules/ImageLoader/ImageLoader'
import type { RecipeItem } from '@plugins/api/interfaces/recipes'
import { Link, useNavigate } from '@tanstack/react-router'
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import { useCallback, type FC } from 'react'
import { useRecipesSearch } from '../context/useRecipesSearch'
import style from './RecipeItemCard.module.css'

export const RecipeItemCard: FC<{
  recipe: RecipeItem
}> = ({ recipe }) => {
  const { saveFeedback } = useRecipesSearch()
  const navigate = useNavigate()

  const onSaveFeedback = useCallback(
    (feedback: 'like' | 'dislike') => {
      saveFeedback(recipe, feedback)
      navigate({ to: '/' })
    },
    [navigate, recipe, saveFeedback]
  )

  return (
    <Card className={style.root}>
      <Typography
        size="l"
        weight="bold">
        {recipe.strMeal}
      </Typography>
      <div className={style.content}>
        <ImageLoader
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          size={150}
        />
        <div className={style.info}>
          <div className={style.infoTags}>
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
            <Link
              to="/recipes/$id"
              target='_blank'
              params={{ id: recipe.idMeal }}>
              View recipe
            </Link>
          </div>
          <div className={style.feedbackActions}>
            <Typography
              size="s"
              weight="bold">
              Did it match your preference?
            </Typography>
            <div className={style.actions}>
              <Button
                variant="neutral"
                size="small"
                title="Dislike"
                onClick={() => onSaveFeedback('dislike')}>
                <ThumbsDown size={16} />
              </Button>
              <Button
                variant="purple"
                size="small"
                title="Like"
                onClick={() => onSaveFeedback('like')}>
                <ThumbsUp size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
