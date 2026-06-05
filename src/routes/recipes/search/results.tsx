import { Results } from '@features/RecipesSearch/Results/Results'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/recipes/search/results')({
  component: Results
})
