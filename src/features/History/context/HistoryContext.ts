import { createContext } from 'react'

export interface FeedbackItem {
  id: string
  title: string
  image: string
  feedback: 'like' | 'dislike'
  inputs: {
    areaOfInterest: string
    category: string
  }
  createdAt: number
}

export interface HistoryContextValue {
  feedbackItems: FeedbackItem[] | null
  pushFeedbackItem: (feedbackItem: FeedbackItem) => void
}

export const HistoryContext = createContext<HistoryContextValue>(
  undefined as unknown as HistoryContextValue
)
