import { Typography } from '@components/atoms/Typography/Typography'
import type { FC, ReactNode } from 'react'
import style from './SearchSection.module.css'

interface SearchSectionProps {
  titleEl: ReactNode
  selectionEl: ReactNode
  children: ReactNode
  actionsEl: ReactNode
}

export const SearchSection: FC<SearchSectionProps> = ({
  titleEl,
  selectionEl,
  children,
  actionsEl
}) => {
  return (
    <div className={style.root}>
      <div className={style.heading}>
        {titleEl}
        <Typography>We'll use this to find recipes that match your interests.</Typography>
      </div>
      {!!selectionEl && <div className={style.selection}>{selectionEl}</div>}
      <div className={style.content}>{children}</div>
      <div className={style.actions}>{actionsEl}</div>
    </div>
  )
}
