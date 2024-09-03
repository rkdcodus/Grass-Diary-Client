import { useState, useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import useModal from '@hooks/useModal';
import { checkAuth } from '@utils/authUtils';
import LoginModal from './LoginModal/LoginModal';

import * as S from '@styles/Intro/IntroStyles';
import { Divider } from '@components/index';
import { INTRO_MESSAGES } from '@constants/message';

const OpenModalButton = ({ top }: { top: string }) => {
  const navigate: NavigateFunction = useNavigate();
  const { isModalOpen, handleOpenModal, handleCloseModal }: IModalReturn =
    useModal();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const loggedIn = async () => {
      const accessToken = await checkAuth();
      if (accessToken) setIsLoggedIn(true);
    };

    loggedIn();
  }, []);

  type TStartButton = () => void;

  const handleStartButton: TStartButton = () => {
    if (isLoggedIn) navigate('/main');
    if (!isLoggedIn) handleOpenModal();
  };

  return (
    <>
      <Divider />
      <S.LoginButtonContainer>
        <S.LoginButton onClick={handleStartButton}>
          <S.ButtonText>{INTRO_MESSAGES.writeDiary}</S.ButtonText>
          <img src="/assets/icons/button-solid-chevron-right.svg" />
        </S.LoginButton>
      </S.LoginButtonContainer>
      {!isLoggedIn && isModalOpen && (
        <LoginModal
          top={top}
          isOpen={handleOpenModal}
          isClose={handleCloseModal}
        />
      )}
    </>
  );
};

const FirstSection = () => {
  return (
    <>
      <S.CommonSection>
        <S.MainBox>
          <S.FirstTitleContainer>
            <S.LogoImg src="/assets/icons/logo.png" />
            <S.MainTitle>{INTRO_MESSAGES.firstSection.serviceName}</S.MainTitle>
          </S.FirstTitleContainer>
          <S.MainIntrouctionText>
            {INTRO_MESSAGES.firstSection.serviceIntroduction}
          </S.MainIntrouctionText>
          <OpenModalButton top="50%" />
        </S.MainBox>
      </S.CommonSection>
      <S.ScrollMessageContainer>
        <S.ScrollText>{INTRO_MESSAGES.firstSection.scrollMessage}</S.ScrollText>
        <S.ScrollImg src="/assets/icons/expand-more.svg" />
      </S.ScrollMessageContainer>
    </>
  );
};

const SecondSection = () => {
  return (
    <S.CommonSection>
      <S.CommonArticle>
        <S.CommonTitleContainer>
          <S.CommonTitle>
            <S.HighlightText>기록</S.HighlightText>하고
            <S.HighlightText> 성장</S.HighlightText>
            {INTRO_MESSAGES.secondSection.secondTitle}
          </S.CommonTitle>
          <S.CommonIntroductionText>
            {INTRO_MESSAGES.secondSection.secondIntroduction}
          </S.CommonIntroductionText>
        </S.CommonTitleContainer>
        <img src="/assets/img/banner:record.svg" />
      </S.CommonArticle>
    </S.CommonSection>
  );
};

const ThirdSection = () => {
  return (
    <S.CommonSection>
      <S.CommonArticle>
        <img src="/assets/img/card:publicDiary.svg" />
        <S.CommonTitleContainer>
          <S.CommonTitle>
            {INTRO_MESSAGES.thirdSection.thirdTitle}
            <S.HighlightText>구경</S.HighlightText>하고
            <S.HighlightText> 소통</S.HighlightText>해요
          </S.CommonTitle>
          <S.CommonIntroductionText>
            {INTRO_MESSAGES.thirdSection.thirdIntroduction}
          </S.CommonIntroductionText>
        </S.CommonTitleContainer>
      </S.CommonArticle>
    </S.CommonSection>
  );
};

const LastSection = () => {
  return (
    <S.CommonSection>
      <S.MainBox>
        <S.MainIntrouctionText>
          {INTRO_MESSAGES.lastSection.startMessage}
        </S.MainIntrouctionText>
        <OpenModalButton top="50%" />
      </S.MainBox>
    </S.CommonSection>
  );
};

export { FirstSection, SecondSection, ThirdSection, LastSection };
