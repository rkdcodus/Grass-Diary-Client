import styled from 'styled-components';
import { semantic } from '@styles/semantic';
import { ReactComponent as Info } from '@svg/info.svg';

const Banner = () => {
  return (
    <>
      <Section>
        <Container>
          <Info />
          <Text>
            잔디 일기에는 앞으로 더 매력적인 콘텐츠들이 추가될 예정이에요!
          </Text>
        </Container>
      </Section>
    </>
  );
};

export default Banner;

const Section = styled.div`
  display: flex;
  max-width: var(--vw-desktop-min, 960px);
  padding: var(--gap-4xl, 48px) var(--gap-xl, 24px);
  justify-content: center;
  align-items: center;
  gap: var(--gap-empty, 0px);

  border-radius: var(--radius-empty, 0px);
  opacity: var(--opacity-visible, 1);
`;

const Container = styled.div`
  display: flex;
  width: 420px;
  padding: var(--gap-3xs, 6px) var(--gap-sm, 12px);
  align-items: flex-start;
  gap: var(--gap-2xs, 8px);

  border-radius: var(--radius-xs, 8px);
  border: var(--stroke-thin, 1px) solid
    ${semantic.light.border.transparent.alternative};
  opacity: var(--opacity-visible, 1);
  background: ${semantic.light.fill.transparent.assistive};
`;

const Text = styled.p`
  flex: 1 0 0;

  color: ${semantic.light.object.transparent.alternative};

  /* caption/2 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 157.143% */

  opacity: var(--opacity-visible, 1);
`;
