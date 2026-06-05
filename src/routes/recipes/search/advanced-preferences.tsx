import { createFileRoute } from '@tanstack/react-router'

const RouteComponent = () => {
  return <div>Hello "/recipes/search/advanced-preferences"!</div>
}

export const Route = createFileRoute('/recipes/search/advanced-preferences')({
  component: RouteComponent
})
