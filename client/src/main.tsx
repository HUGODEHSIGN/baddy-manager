import Providers from '@/client/providers/index';
import { Home, Location, Root } from '@/client/routes';
import locationIdLoader, {
  locationIdPath,
} from '@/client/routes/loaders/location';
import '@radix-ui/themes/styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { typesafeBrowserRouter } from 'react-router-typesafe';

const { router, href } = typesafeBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '/', element: <Home /> },
      { path: locationIdPath, loader: locationIdLoader, element: <Location /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </React.StrictMode>
);

export default href;
