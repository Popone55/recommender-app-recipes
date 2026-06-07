import { Card } from '@components/atoms/Card/Card'
import { Skeleton } from '@components/atoms/Skeleton/Skeleton'
import style from './RecipeItemCard.module.css'

export const RecipeItemCardSkeleton = () => {
  return (
    <Card className={style.root}>
      <Skeleton
        width="240px"
        height="24px"
      />
      <div className={style.content}>
        <Skeleton
          width="150px"
          height="150px"
        />
        <div className={style.info}>
          <Skeleton
            width="100px"
            height="24px"
          />
          <Skeleton
            width="100px"
            height="24px"
          />
        </div>
      </div>
    </Card>
  )
}
