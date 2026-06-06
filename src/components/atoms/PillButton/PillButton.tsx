import clsx from 'clsx'
import type { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import { Typography } from '../Typography/Typography'
import style from './PillButton.module.css'

interface PillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  onClick?: () => void
  suffix?: ReactNode
  disabled?: boolean
}

export const PillButton: FC<PillButtonProps> = ({
  children,
  onClick,
  suffix,
  disabled,
  ...props
}) => {
  const Component = onClick ? 'button' : 'span'

  return (
    <Component
      disabled={disabled}
      className={clsx(style.root, { [style.clickable]: !!onClick, [style.disabled]: disabled })}
      onClick={onClick}
      {...props}>
      <Typography size="xs">{children}</Typography>
      {suffix}
    </Component>
  )
}
