import { Card } from '@components/atoms/Typography/Card/Card'
import { Typography } from '@components/atoms/Typography/Typography'
import { FeedbackItemCard } from './FeedbackItemCard/FeedbackItemCard'
import style from './History.module.css'
import { useHistoryContext } from './context/useHistoryContext'

export const History = () => {
  const { feedbackItems } = useHistoryContext()

  if (!feedbackItems?.length) return null

  return (
    <Card className={style.root}>
      <Typography
        size="l"
        weight="bold">
        History
      </Typography>
      <div className={style.feedbackItems}>
        {feedbackItems.map((feedbackItem) => (
          <FeedbackItemCard
            key={feedbackItem.id}
            feedbackItem={feedbackItem}
          />
        ))}
      </div>
    </Card>
  )
}
