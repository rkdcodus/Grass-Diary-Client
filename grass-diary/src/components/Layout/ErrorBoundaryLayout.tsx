import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorPage } from '@pages/index';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

const ErrorBoundaryLayout = () => {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ErrorBoundary FallbackComponent={ErrorPage} onReset={reset}>
      <Outlet />
    </ErrorBoundary>
  );
};

export default ErrorBoundaryLayout;
