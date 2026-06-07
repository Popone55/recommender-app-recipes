import { Button } from '@components/atoms/Button/Button'
import { Card } from '@components/atoms/Card/Card'
import { useNavigate } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import type { FC, ReactNode } from 'react'
import style from './RecipesSearchLayout.module.css'

export const RecipesSearchLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate()
  return (
    <div className={style.root}>
      <Button
        aria-label="Back to home"
        variant="neutral"
        size="small"
        startIcon={<ArrowLeft size={16} />}
        onClick={() => navigate({ to: '/' })}>
        Back to home
      </Button>
      <Card className={style.card}>{children}</Card>
    </div>
  )
}
