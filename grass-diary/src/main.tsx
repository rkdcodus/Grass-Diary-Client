import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import './styles/reset.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </QueryClientProvider>
  </React.StrictMode>,
);
