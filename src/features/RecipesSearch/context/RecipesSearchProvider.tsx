import { useMemo, useState, type FC, type ReactNode } from 'react'
import { RecipesSearchContext } from './RecipesSearchContext'

export const RecipesSearchProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [areaOfInterest, setAreaOfInterest] = useState<string | null>(null)

  const contextValue = useMemo(
    () => ({ areaOfInterest, setAreaOfInterest }),
    [areaOfInterest, setAreaOfInterest]
  )

  return <RecipesSearchContext value={contextValue}>{children}</RecipesSearchContext>
}
