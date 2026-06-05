import { Card } from '@components/atoms/Typography/Card/Card'
import type { FC, ReactNode } from 'react'
import style from './RecipesSearchLayout.module.css'

export const RecipesSearchLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={style.root}>
      <Card>{children}</Card>
    </div>
  )
}
