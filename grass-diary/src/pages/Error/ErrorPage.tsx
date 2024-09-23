'use client';

import Footer from '@components/Layout/Footer';
import Header from '@components/Layout/Header';
import * as S from '@styles/Error/ErrorPage.style';
import { FallbackProps } from 'react-error-boundary';

const ErrorPage = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <>
      <Header resetErrorBoundary={resetErrorBoundary} />
      <S.Container>
        <S.ErrorSection>
          <S.ErrorText>{error.response.data.description}</S.ErrorText>
        </S.ErrorSection>
      </S.Container>
      <Footer />
    </>
  );
};
export default ErrorPage;
