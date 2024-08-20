import styled from 'styled-components';
import { MAIN_MESSAGES } from '@constants/message';
import { semantic } from '@styles/semantic';
import { ReactComponent as Info } from '@svg/info.svg';
import { TYPO } from '@styles/typo';

const Banner = () => {
  return (
    <>
      <Section>
        <Container>
          <Info />
          <Text>{MAIN_MESSAGES.banner.future_content_message}</Text>
        </Container>
      </Section>
    </>
  );
};

export default Banner;

const Section = styled.div`
  display: flex;
  max-width: var(--vw-desktop-min, 60rem);
  padding: var(--gap-4xl, 3rem) var(--gap-xl, 1.5rem);
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  width: 26.25rem;
  padding: var(--gap-3xs, 0.375rem) var(--gap-sm, 0.75rem);
  align-items: flex-start;
  gap: var(--gap-2xs, 0.5rem);

  border-radius: var(--radius-xs, 0.5rem);
  border: var(--stroke-thin, 0.0625rem) solid
    ${semantic.light.border.transparent.alternative};

  background: ${semantic.light.fill.transparent.assistive};
`;

const Text = styled.p`
  flex: 1 0 0;

  color: ${semantic.light.object.transparent.alternative};

  ${TYPO.caption2}
`;
