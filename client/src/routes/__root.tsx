import Providers from '@/client/providers';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  return (
    <>
      <Providers>
        <div>
          <Link to="/">Home</Link>
          <Link to="/fetchTest">FetchTest</Link>
        </div>
        <hr />
        <Outlet />
        <TanStackRouterDevtools />
      </Providers>
    </>
  );
}
