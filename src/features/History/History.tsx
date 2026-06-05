import { Card } from '@components/atoms/Typography/Card/Card'
import { Typography } from '@components/atoms/Typography/Typography'
import { useEffectOnceWhen } from '@hooks/useEffectOnceWhen'
import type { FeedbackItem } from '@plugins/api/interfaces/recipes'
import { getLocalStorageValue, LocalStorageKey } from '@plugins/localStorage'
import { useState } from 'react'
import { FeedbackItemCard } from './FeedbackItemCard/FeedbackItemCard'
import style from './History.module.css'

export const History = () => {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([])

  useEffectOnceWhen(() => {
    const feedbackItems = getLocalStorageValue<FeedbackItem[]>(LocalStorageKey.FEEDBACK_ITEMS)
    if (!feedbackItems) return
    setFeedbackItems(feedbackItems)
  })

  if (!feedbackItems.length) return null

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
