import AnimateReward from './AnimateReward';
import styled from 'styled-components';
import subCharacter from '@icon/subCharacter.png';
import Swal from 'sweetalert2';
import { semantic } from '@styles/semantic';
import { useReward } from '@hooks/api/useReward';
import { Link } from 'react-router-dom';
import { MAIN_MESSAGES } from '@constants/message';
import { ReactComponent as Avatar } from '@svg/avatarBg.svg';
import { ReactComponent as Arrow } from '@svg/chevron_right.svg';
import { ReactComponent as ArrowBlack } from '@svg/chevron_right_black.svg';
import { TYPO } from '@styles/typo';

const BottomSection = () => {
  const { reward } = useReward();

  const modal = () => {
    Swal.fire({
      title: '테마 상점',
      text: '테마 상점 준비중이에요',
      imageUrl: subCharacter,
      imageWidth: 300,
      imageHeight: 300,
      imageAlt: 'Custom image',
      confirmButtonColor: '#28CA3B',
      confirmButtonText: '확인',
    });
  };

  const handleClick = () => window.scrollTo(0, 0);
  return (
    <>
      <Section>
        <Container>
          <Card>
            <CardText>{MAIN_MESSAGES.BOTTOM_SECTION.MY_REWARD}</CardText>
            <CardSubText>
              {MAIN_MESSAGES.BOTTOM_SECTION.REWARD_MESSAGE}
            </CardSubText>
            <Divider></Divider>
            <Wrap>
              <RewardContainer>
                <Avatar></Avatar>
                <RewardPoint>
                  <AnimateReward n={reward?.rewardPoint ?? 0} />
                </RewardPoint>
              </RewardContainer>
              <ThemeMarketBtn>
                <ThemeMarketText onClick={modal}>
                  {MAIN_MESSAGES.BOTTOM_SECTION.THEME_STORE}
                </ThemeMarketText>
                <Arrow></Arrow>
              </ThemeMarketBtn>
            </Wrap>
          </Card>
          <Card>
            <CardText>
              {MAIN_MESSAGES.BOTTOM_SECTION.MONTHLY_DIARY_REVIEW}
            </CardText>
            <CardSubText>
              {MAIN_MESSAGES.BOTTOM_SECTION.REVIEW_DESCRIPTION}
            </CardSubText>
            <Divider></Divider>
            <RetrospectContainer>
              <RetrospectBtn>
                <Link to="/mypage" onClick={handleClick}>
                  <RetrospectText>
                    {MAIN_MESSAGES.BOTTOM_SECTION.GO_TO_REVIEW}
                  </RetrospectText>
                </Link>
                <ArrowBlack></ArrowBlack>
              </RetrospectBtn>
            </RetrospectContainer>
          </Card>
        </Container>
      </Section>
      <Link to="/share" onClick={handleClick}>
        <SeeMoreContainer>
          <SeeMoreBtn>{MAIN_MESSAGES.BOTTOM_SECTION.SEE_MORE}</SeeMoreBtn>
          <ArrowBlack></ArrowBlack>
        </SeeMoreContainer>
      </Link>
    </>
  );
};

export default BottomSection;

const Section = styled.div`
  display: flex;
  padding: var(--gap-lg, 1.25rem) var(--gap-xl, 1.5rem);
  justify-content: center;
  align-items: center;
  gap: var(--gap-xl, 1.5rem);
  align-self: stretch;
`;

const Container = styled.div`
  display: flex;
  max-width: var(--vw-desktop-min, 60rem);
  padding: var(--gap-empty, 0rem);
  justify-content: center;
  align-items: center;
  gap: var(--gap-xl, 1.5rem);
  flex: 1 0 0;
`;

const Card = styled.div`
  display: flex;
  padding: var(--gap-lg, 1.25rem);
  flex-direction: column;
  align-items: flex-start;
  gap: var(--gap-md, 1rem);
  flex: 1 0 0;

  border-radius: var(--radius-md, 1rem);
  border: var(--stroke-thin, 0.0625rem) solid
    ${semantic.light.border.transparent.assistive};

  background: ${semantic.light.bg.solid.normal};

  box-shadow: 0rem 0rem 0.0625rem 0rem rgba(0, 0, 0, 0.04),
    0rem 0.125rem 0.25rem 0rem rgba(0, 0, 0, 0.08);
`;

const Divider = styled.div`
  width: 26.75rem;
  height: 0.0625rem;

  background: ${semantic.light.border.transparent.alternative};
`;

const CardText = styled.p`
  align-self: stretch;

  color: ${semantic.light.object.transparent.neutral};

  ${TYPO.label3}
`;

const CardSubText = styled.p`
  align-self: stretch;

  color: ${semantic.light.object.transparent.neutral};

  ${TYPO.caption2}
`;

const Wrap = styled.div`
  display: flex;
  padding: var(--gap-empty, 0rem);
  align-items: center;
  gap: var(--gap-md, 1rem);
  align-self: stretch;
`;

const RewardContainer = styled.div`
  display: flex;
  padding: var(--gap-empty, 0rem);
  align-items: center;
  gap: var(--gap-2xs, 0.5rem);
  flex: 1 0 0;
`;

const RewardPoint = styled.p`
  flex: 1 0 0;

  color: ${semantic.light.accent.solid.normal};
`;

const ThemeMarketBtn = styled.button`
  display: flex;
  padding: var(--gap-xs, 0.625rem) var(--gap-md, 1rem);
  justify-content: center;
  align-items: center;
  gap: var(--gap-2xs, 0.5rem);

  border-radius: var(--radius-xs, 0.5rem);
  border: var(--stroke-thin, 0.0625rem) solid
    ${semantic.light.accent.solid.normal};

  background: ${semantic.light.accent.transparent.normal};

  cursor: pointer;
`;

const ThemeMarketText = styled.p`
  color: ${semantic.light.accent.solid.hero};
  text-align: center;

  ${TYPO.label2}
`;

const RetrospectContainer = styled.div`
  display: flex;
  padding: var(--gap-empty, 0rem);
  justify-content: flex-end;
  align-items: center;
  gap: var(--gap-empty, 0rem);
  align-self: stretch;
`;

const RetrospectBtn = styled.button`
  display: flex;
  padding: var(--gap-xs, 0.625rem) var(--gap-md, 1rem);
  justify-content: center;
  align-items: center;
  gap: var(--gap-2xs, 0.5rem);

  border-radius: var(--radius-xs, 0.5rem);
`;

const RetrospectText = styled.p`
  text-align: center;

  ${TYPO.label2}
`;

const SeeMoreContainer = styled.div`
  display: flex;
  padding: var(--gap-4xs, 0.25rem) var(--gap-2xs, 0.5rem);
  justify-content: center;
  align-items: center;
  gap: var(--gap-2xs, 0.5rem);

  border-radius: var(--radius-xs, 0.5rem);
`;

const SeeMoreBtn = styled.p`
  color: ${semantic.light.object.transparent.alternative};
  text-align: center;

  ${TYPO.label2}
`;
