import { Outlet, createRootRoute } from '@tanstack/react-router';
import * as React from 'react';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <main className="mx-auto flex max-h-[840px] w-full justify-center">
        <div className="flex h-screen w-[500px] max-w-[500px] flex-col items-center justify-between bg-white">
          <Outlet />
        </div>
      </main>
    </React.Fragment>
  );
}
