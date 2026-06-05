import { RecipeDetails } from '@features/RecipeDetails/RecipeDetails'
import { createFileRoute, useParams } from '@tanstack/react-router'

const RouteComponent = () => {
  const { id } = useParams({ from: '/recipes/$id' })
  return <RecipeDetails id={id} />
}

export const Route = createFileRoute('/recipes/$id')({
  component: RouteComponent
})
