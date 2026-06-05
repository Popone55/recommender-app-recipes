import { BasicPreferences } from '@features/RecipesSearch/BasicPreferences/BasicPreferences'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/recipes/search/basic-preferences')({
  component: BasicPreferences
})
