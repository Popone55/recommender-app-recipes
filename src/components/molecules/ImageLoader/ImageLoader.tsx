import { Skeleton } from '@components/atoms/Skeleton/Skeleton'
import { useState, type FC } from 'react'
import style from './ImageLoader.module.css'

const getSuffix = (size: number) => {
  if (size <= 150) return '/small'
  if (size <= 250) return '/medium'
  return ''
}

export const ImageLoader: FC<{ src: string; alt: string; size: number }> = ({ src, alt, size }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div
      className={style.imageWrapper}
      style={{ width: size, height: size }}>
      {!isLoaded && (
        <Skeleton
          width={size}
          height={size}
        />
      )}
      <img
        src={src + getSuffix(size)}
        alt={alt}
        title={alt}
        style={{ width: size, height: size }}
        className={!isLoaded ? style.imageHidden : undefined}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  )
}
