import type { FC, ReactNode } from 'react'
import style from './AppLayout.module.css'

export const AppLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={style.root}>
      <div className={style.content}>{children}</div>
    </div>
  )
}
