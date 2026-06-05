import type { FC, ReactNode } from 'react'
import style from './SearchSection.module.css'

interface SearchSectionProps {
  titleEl: ReactNode
  descriptionEl: ReactNode
  selectionEl?: ReactNode
  children: ReactNode
  actionsEl: ReactNode
}

export const SearchSection: FC<SearchSectionProps> = ({
  titleEl,
  descriptionEl,
  selectionEl,
  children,
  actionsEl
}) => {
  return (
    <div className={style.root}>
      <div className={style.heading}>
        {titleEl}
        {descriptionEl}
      </div>
      {!!selectionEl && <div className={style.selection}>{selectionEl}</div>}
      <div className={style.content}>{children}</div>
      <div className={style.actions}>{actionsEl}</div>
    </div>
  )
}
