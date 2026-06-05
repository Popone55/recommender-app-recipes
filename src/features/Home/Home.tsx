import { Button } from '@components/atoms/Button/Button'
import { Card } from '@components/atoms/Typography/Card/Card'
import { Typography } from '@components/atoms/Typography/Typography'
import { useNavigate } from '@tanstack/react-router'
import style from './Home.module.css'

export const Home = () => {
  const navigate = useNavigate()

  return (
    <div className={style.root}>
      <Card
        className={style.card}
        onClick={() => navigate({ to: '/recipes/search/basic-preferences' })}>
        <Typography
          size="5xl"
          align='center'
          weight="bold">
          Let's find a recipe!
        </Typography>
        <Typography align='center'> 
          Click the button below to get started. We'll help you find the right recipe for you.
        </Typography>
        <Button
          variant="purple"
          size="large">
          Get started
        </Button>
      </Card>
    </div>
  )
}
