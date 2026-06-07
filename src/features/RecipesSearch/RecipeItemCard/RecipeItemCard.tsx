import { Button } from '@components/atoms/Button/Button'
import { Card } from '@components/atoms/Card/Card'
import { PillButton } from '@components/atoms/PillButton/PillButton'
import { Typography } from '@components/atoms/Typography/Typography'
import { ImageLoader } from '@components/molecules/ImageLoader/ImageLoader'
import type { RecipeItem } from '@plugins/api/interfaces/recipes'
import { useNavigate } from '@tanstack/react-router'
import { ExternalLink, ThumbsDown, ThumbsUp } from 'lucide-react'
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
            {!!recipe.strArea && <PillButton>{recipe.strArea}</PillButton>}
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
                aria-label="Dislike recipe"
                title="Dislike"
                onClick={() => onSaveFeedback('dislike')}>
                <ThumbsDown size={16} />
              </Button>
              <Button
                variant="purple"
                size="small"
                aria-label="Like recipe"
                title="Like"
                onClick={() => onSaveFeedback('like')}>
                <ThumbsUp size={16} />
              </Button>
            </div>
          </div>

          <Button
            variant="neutral"
            aria-label="View recipe"
            size="small"
            onClick={() => navigate({ to: '/recipes/$id', params: { id: recipe.idMeal } })}
            endIcon={<ExternalLink size={16} />}>
            View recipe
          </Button>
        </div>
      </div>
    </Card>
  )
}
