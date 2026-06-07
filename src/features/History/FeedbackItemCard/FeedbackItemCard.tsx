import { Button } from '@components/atoms/Button/Button'
import { Card } from '@components/atoms/Card/Card'
import { PillButton } from '@components/atoms/PillButton/PillButton'
import { Typography } from '@components/atoms/Typography/Typography'
import { ImageLoader } from '@components/molecules/ImageLoader/ImageLoader'
import type { FeedbackItem } from '@features/History/context/HistoryContext'
import { Link } from '@tanstack/react-router'
import { ExternalLink, ThumbsDown, ThumbsUp } from 'lucide-react'
import { type FC } from 'react'
import style from './FeedbackItemCard.module.css'

export const FeedbackItemCard: FC<{
  feedbackItem: FeedbackItem
}> = ({ feedbackItem }) => {
  return (
    <Link
      to="/recipes/$id"
      params={{ id: feedbackItem.id }}
      className={style.link}>
      <Card className={style.root}>
        <div className={style.header}>
          <div className={style.headerContent}>
            <PillButton>
              {feedbackItem.feedback === 'like' ? <ThumbsUp size={16} /> : <ThumbsDown size={16} />}
            </PillButton>
            <Typography
              size="l"
              weight="bold">
              {feedbackItem.title}
            </Typography>
          </div>
          <Button
            variant="neutral"
            size="small"
            endIcon={<ExternalLink size={16} />}>
            View recipe
          </Button>
        </div>
        <div className={style.content}>
          <ImageLoader
            src={feedbackItem.image}
            alt={feedbackItem.title}
            size={100}
          />
          <div className={style.info}>
            <div className={style.infoTags}>
              {!!feedbackItem.inputs.areaOfInterest && (
                <div className={style.infoTag}>
                  <Typography
                    size="s"
                    weight="bold">
                    Area:
                  </Typography>
                  <PillButton>{feedbackItem.inputs.areaOfInterest}</PillButton>
                </div>
              )}
              {!!feedbackItem.inputs.category && (
                <div className={style.infoTag}>
                  <Typography
                    size="s"
                    weight="bold">
                    Country:
                  </Typography>
                  <PillButton>{feedbackItem.inputs.category}</PillButton>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
