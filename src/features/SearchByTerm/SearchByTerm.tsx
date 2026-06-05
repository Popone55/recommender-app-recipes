import { LoadingSpinner } from '@components/atoms/LoadingSpinner/LoadingSpinner'
import { PillButton } from '@components/atoms/PillButton/PillButton'
import { Card } from '@components/atoms/Typography/Card/Card'
import { Typography } from '@components/atoms/Typography/Typography'
import { ImageLoader } from '@components/molecules/ImageLoader/ImageLoader'
import { TextInput } from '@components/molecules/TextInput/TextInput'
import { useSearchRecipes } from '@hooks/api/query/useSearchRecipes'
import { useDebounce } from '@hooks/useDebounce'
import { Link } from '@tanstack/react-router'
import clsx from 'clsx'
import { useMemo, useState, type FC } from 'react'
import style from './SearchByTerm.module.css'

export const SearchByTerm: FC<{ className?: string }> = ({ className }) => {
  const [query, setQuery] = useState('')
  const [tmpQuery, setTmpQuery] = useState('')
  const { data, isLoading, error } = useSearchRecipes(query)

  const showEmptyState = useMemo(() => {
    return !isLoading && !error && !data?.meals?.length
  }, [isLoading, error, data?.meals])

  useDebounce(
    () => {
      setQuery(tmpQuery)
    },
    [tmpQuery],
    500
  )

  return (
    <Card className={clsx(style.root, className)}>
      <Typography
        size="l"
        weight="bold">
        Search recipes from DB
      </Typography>
      <TextInput
        label="Search by term"
        value={tmpQuery}
        disabled={isLoading}
        onChange={setTmpQuery}
        placeholder="Search recipe by text"
      />
      {isLoading && (
        <div className={style.loading}>
          <LoadingSpinner
            size="small"
            variant="gray"
          />
        </div>
      )}
      {error && (
        <Typography
          size="m"
          align="center"
          weight="bold">
          An error occurred while searching for recipes. Please try again later.
        </Typography>
      )}
      {showEmptyState && (
        <Typography
          align="center"
          size="m"
          weight="bold">
          No recipes found. Please try again with different preferences.
        </Typography>
      )}
      <div className={style.results}>
        {data?.meals?.map((meal) => (
          <Link
            key={meal.idMeal}
            to="/recipes/$id"
            params={{ id: meal.idMeal }}
            className={style.resultItemLink}>
            <Card className={style.resultItem}>
              <ImageLoader
                src={meal.strMealThumb}
                alt={meal.strMeal}
                size={80}
              />
              <Typography
                size="m"
                weight="bold">
                {meal.strMeal}
              </Typography>
              {!!meal.strArea && <PillButton>{meal.strArea}</PillButton>}
              {!!meal.strCountry && <PillButton>{meal.strCountry}</PillButton>}
            </Card>
          </Link>
        ))}
      </div>
    </Card>
  )
}
