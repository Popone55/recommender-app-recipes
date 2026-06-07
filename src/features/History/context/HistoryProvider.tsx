import { LocalStorageKey, useLocalStorage } from '@hooks/useLocalStorage'
import { useCallback, useMemo, type FC, type ReactNode } from 'react'
import { HistoryContext, type FeedbackItem } from './HistoryContext'

export const HistoryProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [feedbackItems, setFeedbackItems] = useLocalStorage<FeedbackItem[]>(
    LocalStorageKey.FEEDBACK_ITEMS
  )

  const addFeedbackItem = useCallback(
    (feedbackItem: FeedbackItem) => {
      setFeedbackItems([
        feedbackItem,
        ...(feedbackItems?.filter((item) => item.id !== feedbackItem.id) ?? [])
      ])
    },
    [feedbackItems, setFeedbackItems]
  )

  const contextValue = useMemo(
    () => ({ feedbackItems, addFeedbackItem }),
    [feedbackItems, addFeedbackItem]
  )

  return <HistoryContext value={contextValue}>{children}</HistoryContext>
}
