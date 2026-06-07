import clsx from 'clsx'
import type { FC } from 'react'
import style from './LoadingSpinner.module.css'

interface LoadingSpinnerProps {
  size?: 'large' | 'medium' | 'small' | 'xsmall' | 'xxsmall' | 'xxxsmall'
}

export const LoadingSpinner: FC<LoadingSpinnerProps> = ({ size = 'large' }) => (
  <div
    data-aptus-id="loader"
    className={clsx(style.root, {
      [style.large]: size === 'large',
      [style.medium]: size === 'medium',
      [style.small]: size === 'small',
      [style.xsmall]: size === 'xsmall',
      [style.xxsmall]: size === 'xxsmall',
      [style.xxxsmall]: size === 'xxxsmall'
    })}>
    <svg
      className={style.spinner}
      viewBox="0 0 66 66"
      xmlns="http://www.w3.org/2000/svg">
      <circle
        className={style.path}
        fill="none"
        strokeWidth="6"
        cx="33"
        cy="33"
        r="30"></circle>
    </svg>
  </div>
)
