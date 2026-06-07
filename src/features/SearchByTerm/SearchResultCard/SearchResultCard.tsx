import { Button } from '@components/atoms/Button/Button'
import { Card } from '@components/atoms/Card/Card'
import { PillButton } from '@components/atoms/PillButton/PillButton'
import { Typography } from '@components/atoms/Typography/Typography'
import { ImageLoader } from '@components/molecules/ImageLoader/ImageLoader'
import type { RecipeItem } from '@plugins/api/interfaces/recipes'
import { useNavigate } from '@tanstack/react-router'
import { ExternalLink } from 'lucide-react'
import type { FC } from 'react'
import style from './SearchResultCard.module.css'

export const SearchResultCard: FC<{ meal: RecipeItem }> = ({ meal }) => {
  const navigate = useNavigate()

  return (
    <Card className={style.resultItem}>
      <ImageLoader
        src={meal.strMealThumb}
        alt={meal.strMeal}
        size={80}
      />
      <div className={style.resultItemContent}>
        <div className={style.resultItemContentTitle}>
          <Typography
            size="m"
            weight="bold">
            {meal.strMeal}
          </Typography>
          {!!meal.strArea && <PillButton>{meal.strArea}</PillButton>}
        </div>
        <Button
          aria-label="View recipe"
          variant="neutral"
          size="small"
          onClick={() => navigate({ to: '/recipes/$id', params: { id: meal.idMeal } })}
          endIcon={<ExternalLink size={16} />}>
          View recipe
        </Button>
      </div>
    </Card>
  )
}
