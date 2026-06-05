import { LocalStorageKey, useLocalStorage } from '@hooks/useLocalStorage'
import { useCallback, useMemo, type FC, type ReactNode } from 'react'
import { HistoryContext, type FeedbackItem } from './HistoryContext'

export const HistoryProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [feedbackItems, setFeedbackItems] = useLocalStorage<FeedbackItem[]>(
    LocalStorageKey.FEEDBACK_ITEMS
  )

  const pushFeedbackItem = useCallback(
    (feedbackItem: FeedbackItem) => {
      setFeedbackItems([feedbackItem, ...(feedbackItems ?? [])])
    },
    [feedbackItems, setFeedbackItems]
  )

  const contextValue = useMemo(
    () => ({ feedbackItems, pushFeedbackItem }),
    [feedbackItems, pushFeedbackItem]
  )

  return <HistoryContext value={contextValue}>{children}</HistoryContext>
}
