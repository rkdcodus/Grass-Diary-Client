import styled from 'styled-components';
import { semantic } from '@styles/semantic';
import { TYPO } from '@styles/typo';
import { ReactComponent as Info } from '@svg/info.svg';

type CalloutProps = {
  message: string;
};

const Callout = ({ message }: CalloutProps) => {
  return (
    <Container>
      <Info />
      <Text>{message}</Text>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-self: center;
  padding: var(--gap-3xs, 0.375rem) var(--gap-sm, 0.75rem);
  align-items: flex-start;
  gap: var(--gap-2xs, 0.5rem);

  border-radius: var(--radius-xs, 0.5rem);
  border: var(--stroke-thin, 0.0625rem) solid
    ${semantic.light.border.transparent.alternative};

  background: ${semantic.light.fill.transparent.assistive};
`;

const Text = styled.p`
  color: ${semantic.light.object.transparent.alternative};

  ${TYPO.caption2}
`;
export default Callout;
