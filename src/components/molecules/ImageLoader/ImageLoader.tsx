import { Skeleton } from '@components/atoms/Skeleton/Skeleton'
import { useState, type FC } from 'react'
import style from './ImageLoader.module.css'

export const ImageLoader: FC<{ src: string; alt: string; size: number }> = ({ src, alt, size }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className={style.imageWrapper}>
      {!isLoaded && (
        <Skeleton
          width={size}
          height={size}
        />
      )}
      <img
        src={src}
        alt={alt}
        title={alt}
        className={!isLoaded ? style.imageHidden : undefined}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  )
}
