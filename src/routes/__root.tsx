import { Outlet, createRootRoute, useNavigate } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import * as React from 'react';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <main className="flex h-full w-full items-center justify-center">
        <div className="flex h-full w-[500px] max-w-[500px] flex-col items-center justify-between bg-gray-200">
          <Outlet />
        </div>
      </main>
      <TanStackRouterDevtools />
    </React.Fragment>
  );
}
