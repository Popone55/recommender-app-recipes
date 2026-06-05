import { Card } from '@components/atoms/Typography/Card/Card'
import { Typography } from '@components/atoms/Typography/Typography'
import clsx from 'clsx'
import type { FC } from 'react'
import { FeedbackItemCard } from './FeedbackItemCard/FeedbackItemCard'
import style from './History.module.css'
import { useHistoryContext } from './context/useHistoryContext'

export const History: FC<{ className?: string }> = ({ className }) => {
  const { feedbackItems } = useHistoryContext()

  if (!feedbackItems?.length) return null

  return (
    <Card className={clsx(style.root, className)}>
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
