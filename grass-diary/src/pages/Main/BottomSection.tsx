import AnimateReward from './AnimateReward';
import styled from 'styled-components';
import { semantic } from '@styles/semantic';
import { useReward } from '@hooks/api/useReward';
import subCharacter from '@icon/subCharacter.png';
import Swal from 'sweetalert2';

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
  return (
    <>
      <Section>
        <Container>
          <Card>
            <CardText>내 잔디 리워드</CardText>
            <CardSubText>잔디를 꾸준히 심고, 리워드를 모아봐요!</CardSubText>
            <Divider></Divider>
            <Wrap>
              <RewardContainer>
                <RewardPoint>
                  <AnimateReward n={reward?.rewardPoint ?? 0} />
                </RewardPoint>
              </RewardContainer>
              <ThemeMarketBtn>
                <ThemeMarketText onClick={modal}>테마 상점</ThemeMarketText>
              </ThemeMarketBtn>
            </Wrap>
          </Card>
          <Card>
            <CardText>한 달 일기 회고</CardText>
            <CardSubText>
              지난 한 달 간의 내 시간과 경험들을 돌아보며 회고해봐요.
            </CardSubText>
            <Divider></Divider>
            <RetrospectContainer>
              <RetrospectBtn>
                <RetrospectText>회고하러 가기</RetrospectText>
              </RetrospectBtn>
            </RetrospectContainer>
          </Card>
        </Container>
      </Section>
    </>
  );
};

export default BottomSection;

const Section = styled.div`
  display: flex;
  padding: var(--gap-lg, 20px) var(--gap-xl, 24px);
  justify-content: center;
  align-items: center;
  gap: var(--gap-xl, 24px);
  align-self: stretch;

  border-radius: var(--radius-empty, 0px);
  opacity: var(--opacity-visible, 1);
`;

const Container = styled.div`
  display: flex;
  max-width: var(--vw-desktop-min, 960px);
  padding: var(--gap-empty, 0px);
  justify-content: center;
  align-items: center;
  gap: var(--gap-xl, 24px);
  flex: 1 0 0;

  border-radius: var(--radius-empty, 0px);
  opacity: var(--opacity-visible, 1);
`;

const Card = styled.div`
  display: flex;
  padding: var(--gap-lg, 20px);
  flex-direction: column;
  align-items: flex-start;
  gap: var(--gap-md, 16px);
  flex: 1 0 0;

  border-radius: var(--radius-md, 16px);
  border: var(--stroke-thin, 1px) solid
    ${semantic.light.border.transparent.assistive};
  opacity: var(--opacity-visible, 1);
  background: ${semantic.light.bg.solid.normal};

  /* shadow/embossed */
  box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.04),
    0px 2px 4px 0px rgba(0, 0, 0, 0.08);
`;

const Divider = styled.div`
  width: 428px;
  height: 1px;

  opacity: var(--opacity-visible, 1);
  background: ${semantic.light.border.transparent.alternative};
`;

const CardText = styled.p`
  align-self: stretch;

  color: ${semantic.light.object.transparent.neutral};

  /* label/3 */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 133.333% */
  letter-spacing: -0.108px;

  opacity: var(--opacity-visible, 1);
`;

const CardSubText = styled.p`
  align-self: stretch;

  color: ${semantic.light.object.transparent.neutral};

  /* caption/2 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 157.143% */

  opacity: var(--opacity-visible, 1);
`;

const Wrap = styled.div`
  display: flex;
  padding: var(--gap-empty, 0px);
  align-items: center;
  gap: var(--gap-md, 16px);
  align-self: stretch;

  border-radius: var(--radius-empty, 0px);
  opacity: var(--opacity-visible, 1);
`;

const RewardContainer = styled.div`
  display: flex;
  padding: var(--gap-empty, 0px);
  align-items: center;
  gap: var(--gap-2xs, 8px);
  flex: 1 0 0;

  border-radius: var(--radius-empty, 0px);
  opacity: var(--opacity-visible, 1);
`;

const RewardPoint = styled.p`
  flex: 1 0 0;

  color: ${semantic.light.accent.solid.normal};

  /* title/3 */
  font-family: Pretendard;
  font-size: 17.5px;
  font-style: normal;
  font-weight: 600;
  line-height: 42px; /* 131.25% */
  letter-spacing: -0.499px;

  opacity: var(--opacity-visible, 1);
`;

const ThemeMarketBtn = styled.button`
  display: flex;
  padding: var(--gap-xs, 10px) var(--gap-md, 16px);
  justify-content: center;
  align-items: center;
  gap: var(--gap-2xs, 8px);

  border-radius: var(--radius-xs, 8px);
  border: var(--stroke-thin, 1px) solid ${semantic.light.accent.solid.normal};
  opacity: var(--opacity-visible, 1);
  background: ${semantic.light.accent.transparent.normal};

  cursor: pointer;
`;

const ThemeMarketText = styled.p`
  color: ${semantic.light.accent.solid.hero};
  text-align: center;

  /* label/2 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px; /* 137.5% */
  letter-spacing: -0.096px;

  opacity: var(--opacity-visible, 1);
`;

const RetrospectContainer = styled.div`
  display: flex;
  padding: var(--gap-empty, 0px);
  justify-content: flex-end;
  align-items: center;
  gap: var(--gap-empty, 0px);
  align-self: stretch;

  border-radius: var(--radius-empty, 0px);
  opacity: var(--opacity-visible, 1);
`;
const RetrospectBtn = styled.button`
  display: flex;
  padding: var(--gap-xs, 10px) var(--gap-md, 16px);
  justify-content: center;
  align-items: center;
  gap: var(--gap-2xs, 8px);

  border-radius: var(--radius-xs, 8px);
  opacity: var(--opacity-visible, 1);
`;

const RetrospectText = styled.p`
  text-align: center;

  /* label/2 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px; /* 137.5% */
  letter-spacing: -0.096px;

  opacity: var(--opacity-visible, 1);
`;
