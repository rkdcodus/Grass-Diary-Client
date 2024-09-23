'use client';

import Footer from '@components/Layout/Footer';
import Header from '@components/Layout/Header';
import * as S from '@styles/Error/ErrorPage.style';
import { FallbackProps } from 'react-error-boundary';

const ErrorPage = ({ error, resetErrorBoundary }: FallbackProps) => {
  const errorResponse = error.response;
  return (
    <>
      <Header resetErrorBoundary={resetErrorBoundary} />
      <S.Container>
        <S.ErrorSection>
          <S.ErrorText>
            {errorResponse ? errorResponse.data.description : error.message}
          </S.ErrorText>
        </S.ErrorSection>
      </S.Container>
      <Footer />
    </>
  );
};
export default ErrorPage;
