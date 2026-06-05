import clsx from 'clsx'
import { useMemo, type FC, type ReactNode } from 'react'
import style from './Skeleton.module.css'

export interface SkeletonProps {
  width?: number | string
  height?: number | string
  className?: string
  children?: ReactNode
}

const computeSize = (size: string | number | undefined) => {
  if (!size) return '100%'
  if (typeof size === 'string') {
    return size
  }
  return size + 'px'
}

export const Skeleton: FC<SkeletonProps> = ({ width, height, className, children }) => {
  const computedWidth = useMemo(() => {
    return computeSize(width)
  }, [width])

  const computedHeight = useMemo(() => {
    return computeSize(height)
  }, [height])

  return (
    <div
      className={clsx(style.root, className)}
      style={children ? undefined : { width: computedWidth, height: computedHeight }}>
      <div className={style.content}>{children}</div>
      <div className={style.shimmer}></div>
    </div>
  )
}
