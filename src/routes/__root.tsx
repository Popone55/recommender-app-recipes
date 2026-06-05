import { createRootRoute, Outlet } from '@tanstack/react-router'
import type { FC } from 'react'

const RootRoute: FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export const Route = createRootRoute({
  component: RootRoute
})
