import { Card } from '@components/atoms/Typography/Card/Card'
import { Typography } from '@components/atoms/Typography/Typography'
import type { RecipeItem } from '@plugins/api/interfaces/recipes'
import type { FC } from 'react'
import style from './RecipeCard.module.css'

export const RecipeItemCard: FC<{
  recipe: RecipeItem
}> = ({ recipe }) => {
  return (
    <Card className={style.root}>
      <Typography
        size="xl"
        weight="bold">
        {recipe.strMeal}
      </Typography>
      <div className={style.content}>
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
        />
        <div className={style.info}>
          <Typography
            size="m"
            weight="medium">
            {recipe.strArea}
          </Typography>
          <Typography
            size="m"
            weight="medium">
            {recipe.strCountry}
          </Typography>
        </div>
      </div>
    </Card>
  )
}
