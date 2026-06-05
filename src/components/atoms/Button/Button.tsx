import clsx from 'clsx'
import {
  type ButtonHTMLAttributes,
  type FC,
  type MouseEvent,
  type ReactNode,
  type RefObject
} from 'react'
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner'
import style from './Button.module.css'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  variant: 'neutral' | 'purple'
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void | PromiseLike<void>
  'data-aptus-id'?: string
  loading?: boolean
  size?: 'small' | 'medium' | 'large'
  ref?: RefObject<HTMLButtonElement>
  startIcon?: ReactNode
}

export const Button: FC<ButtonProps> = ({
  variant = 'neutral',
  onClick,
  children,
  loading,
  type = 'button',
  className,
  size = 'small',
  disabled,
  'aria-label': ariaLabel,
  ref,
  startIcon,
  ...rest
}) => {
  const isDisabled = disabled || loading

  return (
    <button
      {...rest}
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-label={ariaLabel}
      onClick={onClick}
      className={clsx(
        style.root,
        {
          [style.neutral]: variant === 'neutral',
          [style.purple]: variant === 'purple',
          [style.small]: size === 'small',
          [style.medium]: size === 'medium',
          [style.large]: size === 'large',
          [style.disabled]: !!isDisabled
        },
        className
      )}>
      {loading && <LoadingSpinner size="xsmall" />}
      {startIcon}
      {children}
    </button>
  )
}
