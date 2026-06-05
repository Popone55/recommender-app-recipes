import { AdvancedPreferences } from '@features/RecipesSearch/AdvancedPreferences/AdvancedPreferences'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/recipes/search/advanced-preferences')({
  component: AdvancedPreferences
})
