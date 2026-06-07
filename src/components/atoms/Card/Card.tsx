import clsx from 'clsx'
import type { FC, KeyboardEvent, ReactNode } from 'react'
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
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onClick()
    }
  }

  return (
    <div
      {...a11yProps(!!onClick)}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={clsx(style.root, { [style.clickable]: !!onClick }, className)}>
      {children}
    </div>
  )
}
