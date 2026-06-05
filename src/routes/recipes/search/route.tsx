import { RecipesSearchProvider } from '@features/RecipesSearch/context/RecipesSearchProvider'
import { RecipesSearchLayout } from '@features/RecipesSearch/RecipesSearchLayout/RecipesSearchLayout'
import { createFileRoute, Outlet } from '@tanstack/react-router'

const RouteComponent = () => {
  return (
    <RecipesSearchLayout>
      <RecipesSearchProvider>
        <Outlet />
      </RecipesSearchProvider>
    </RecipesSearchLayout>
  )
}

export const Route = createFileRoute('/recipes/search')({
  component: RouteComponent
})
