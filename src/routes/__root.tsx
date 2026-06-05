import { AppLayout } from '@components/atoms/AppLayout/AppLayout'
import { HistoryProvider } from '@features/History/context/HistoryProvider'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import type { FC } from 'react'

const RootRoute: FC = () => {
  return (
    <AppLayout>
      <HistoryProvider>
        <Outlet />
      </HistoryProvider>
    </AppLayout>
  )
}

export const Route = createRootRoute({
  component: RootRoute
})
