import { Card } from '@components/atoms/Card/Card'
import { Skeleton } from '@components/atoms/Skeleton/Skeleton'
import style from './RecipeDetails.module.css'

export const RecipeDetailsSkeleton = () => {
  return (
    <Card className={style.card}>
      <div className={style.header}>
        <Skeleton
          width="320px"
          height="28px"
        />
        <Skeleton
          width="200px"
          height="20px"
        />
      </div>
      <div className={style.content}>
        <Skeleton
          width="250px"
          height="250px"
        />
        <div className={style.info}>
          <Skeleton
            width="140px"
            height="24px"
          />
          <Skeleton
            width="140px"
            height="24px"
          />
          <Skeleton
            width="140px"
            height="24px"
          />
        </div>
      </div>
      <div className={style.section}>
        <Skeleton
          width="120px"
          height="24px"
        />
        <Skeleton
          width="100%"
          height="16px"
        />
        <Skeleton
          width="90%"
          height="16px"
        />
        <Skeleton
          width="80%"
          height="16px"
        />
      </div>
      <div className={style.section}>
        <Skeleton
          width="120px"
          height="24px"
        />
        <Skeleton
          width="100%"
          height="16px"
        />
        <Skeleton
          width="95%"
          height="16px"
        />
        <Skeleton
          width="85%"
          height="16px"
        />
      </div>
    </Card>
  )
}
