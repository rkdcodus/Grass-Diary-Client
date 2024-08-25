import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { GlobalStyle } from './styles/GlobalStyle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Toast from '@components/Toast/Toast';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <RecoilRoot>
        <GlobalStyle />
        <RouterProvider router={router} />
        <Toast />
      </RecoilRoot>
    </QueryClientProvider>
  </React.StrictMode>,
);
