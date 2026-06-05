import { PillButton } from '@components/atoms/PillButton/PillButton'
import { Card } from '@components/atoms/Typography/Card/Card'
import { Typography } from '@components/atoms/Typography/Typography'
import type { RecipeItem } from '@plugins/api/interfaces/recipes'
import type { FC } from 'react'
import style from './RecipeItemCard.module.css'

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
          {!!recipe.strArea && (
            <div className={style.infoTag}>
              <Typography
                size="s"
                weight="medium">
                Area:
              </Typography>
              <PillButton>{recipe.strArea}</PillButton>
            </div>
          )}
          {!!recipe.strCountry && (
            <div className={style.infoTag}>
              <Typography
                size="s"
                weight="medium">
                Country:
              </Typography>
              <PillButton>{recipe.strCountry}</PillButton>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
