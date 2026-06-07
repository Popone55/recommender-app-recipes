import clsx from 'clsx'
import type { ElementType, HTMLAttributes, ReactNode, RefObject } from 'react'
import style from './Typography.module.css'

interface TypographyProps<
  T extends ElementType = 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
> extends Omit<HTMLAttributes<HTMLElement>, 'ref'> {
  children?: ReactNode
  weight?: 'regular' | 'medium' | 'bold'
  size?: '2xs' | 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
  ref?: RefObject<HTMLElement | null>
  as?: T
  align?: 'left' | 'center' | 'right'
}

export const Typography = <T extends ElementType = 'span'>({
  children,
  weight = 'regular',
  size = 's',
  ref,
  as,
  align = 'left',
  ...rest
}: TypographyProps<T>) => {
  const Component = as ?? 'span'

  return (
    <Component
      {...rest}
      ref={ref}
      className={clsx(style.root, style[weight], style[size], style[align], rest.className)}>
      {children}
    </Component>
  )
}
