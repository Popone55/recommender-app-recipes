import { AppLayout } from '@components/atoms/AppLayout/AppLayout'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import type { FC } from 'react'

const RootRoute: FC = () => {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  )
}

export const Route = createRootRoute({
  component: RootRoute
})
