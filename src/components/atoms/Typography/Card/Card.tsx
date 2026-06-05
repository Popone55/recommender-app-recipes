import clsx from 'clsx'
import type { FC, ReactNode } from 'react'
import style from './Card.module.css'

const a11yProps = (clickable: boolean) => {
  if (!clickable) return undefined

  return {
    role: 'button',
    tabIndex: 0
  }
}

export const Card: FC<{
  children: ReactNode
  className?: string
  onClick?: () => void
}> = ({ children, className, onClick }) => {
  return (
    <div
      {...a11yProps(!!onClick)}
      onClick={onClick}
      className={clsx(style.root, { [style.clickable]: !!onClick }, className)}>
      {children}
    </div>
  )
}
