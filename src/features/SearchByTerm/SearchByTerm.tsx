import { LoadingSpinner } from '@components/atoms/LoadingSpinner/LoadingSpinner'
import { Card } from '@components/atoms/Typography/Card/Card'
import { Typography } from '@components/atoms/Typography/Typography'
import { TextInput } from '@components/molecules/TextInput/TextInput'
import { useSearchRecipes } from '@hooks/api/query/useSearchRecipes'
import { useDebounce } from '@hooks/useDebounce'
import clsx from 'clsx'
import { useMemo, useState, type FC } from 'react'
import style from './SearchByTerm.module.css'
import { SearchResultCard } from './SearchResultCard/SearchResultCard'

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
          <SearchResultCard
            key={meal.idMeal}
            meal={meal}
          />
        ))}
      </div>
    </Card>
  )
}
