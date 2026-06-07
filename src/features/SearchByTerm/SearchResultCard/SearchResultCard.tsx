import { Button } from '@components/atoms/Button/Button'
import { PillButton } from '@components/atoms/PillButton/PillButton'
import { Card } from '@components/atoms/Typography/Card/Card'
import { Typography } from '@components/atoms/Typography/Typography'
import { ImageLoader } from '@components/molecules/ImageLoader/ImageLoader'
import type { RecipeItem } from '@plugins/api/interfaces/recipes'
import { Link } from '@tanstack/react-router'
import { ExternalLink } from 'lucide-react'
import type { FC } from 'react'
import style from './SearchResultCard.module.css'

export const SearchResultCard: FC<{ meal: RecipeItem }> = ({ meal }) => {
  return (
    <Link
      to="/recipes/$id"
      params={{ id: meal.idMeal }}
      className={style.resultItemLink}>
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
            variant="neutral"
            size="small"
            endIcon={<ExternalLink size={16} />}>
            View recipe
          </Button>
        </div>
      </Card>
    </Link>
  )
}
