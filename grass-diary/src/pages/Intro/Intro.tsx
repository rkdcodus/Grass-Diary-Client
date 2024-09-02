import * as S from '../../styles/Intro/styles';
import { Divider } from '@components/index';
import { INTRO_MESSAGES } from '@constants/message';

const Intro = () => {
  return (
    <S.IntroContainer>
      <S.CommonSection>
        <S.MainBox>
          <S.FirstTitleContainer>
            <S.LogoImg src="/assets/icons/logo.png" />
            <S.MainTitle>{INTRO_MESSAGES.firstSection.serviceName}</S.MainTitle>
          </S.FirstTitleContainer>
          <S.MainIntrouctionText>
            {INTRO_MESSAGES.firstSection.serviceIntroduction}
          </S.MainIntrouctionText>
          <Divider />
          <S.LoginButtonContainer>
            <S.LoginButton>
              <S.ButtonText>{INTRO_MESSAGES.writeDiary}</S.ButtonText>
              <img src="/assets/icons/button-solid-chevron-right.svg" />
            </S.LoginButton>
          </S.LoginButtonContainer>
        </S.MainBox>
      </S.CommonSection>
      <S.ScrollMessageContainer>
        <S.ScrollText>{INTRO_MESSAGES.firstSection.scrollMessage}</S.ScrollText>
        <S.ScrollImg src="/assets/icons/expand-more.svg" />
      </S.ScrollMessageContainer>
      <S.CommonSection>
        <S.CommonArticle>
          <S.CommonTitleContainer>
            <S.CommonTitle>
              {INTRO_MESSAGES.secondSection.secondTitle}
            </S.CommonTitle>
            <S.CommonIntroductionText>
              {INTRO_MESSAGES.secondSection.secondIntroduction}
            </S.CommonIntroductionText>
          </S.CommonTitleContainer>
        </S.CommonArticle>
      </S.CommonSection>
      <S.CommonSection>
        <S.CommonArticle>
          <S.CommonTitleContainer>
            <S.CommonTitle>
              {INTRO_MESSAGES.thirdSection.thirdTitle}
            </S.CommonTitle>
            <S.CommonIntroductionText>
              {INTRO_MESSAGES.thirdSection.thirdIntroduction}
            </S.CommonIntroductionText>
          </S.CommonTitleContainer>
        </S.CommonArticle>
      </S.CommonSection>
      <S.CommonSection>
        <S.MainBox>
          <S.MainIntrouctionText>
            {INTRO_MESSAGES.lastSection.startMessage}
          </S.MainIntrouctionText>
          <Divider />
          <S.LoginButtonContainer>
            <S.LoginButton>
              <S.ButtonText>{INTRO_MESSAGES.writeDiary}</S.ButtonText>
              <img src="/assets/icons/button-solid-chevron-right.svg" />
            </S.LoginButton>
          </S.LoginButtonContainer>
        </S.MainBox>
      </S.CommonSection>
    </S.IntroContainer>
  );
};

export default Intro;
