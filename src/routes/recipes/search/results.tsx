import { createFileRoute } from '@tanstack/react-router'

const RouteComponent = () => {
  return <div>Hello "/recipes/search/results"!</div>
}

export const Route = createFileRoute('/recipes/search/results')({
  component: RouteComponent
})
