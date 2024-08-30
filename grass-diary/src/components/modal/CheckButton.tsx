import { INTERACTION } from '@styles/interaction';
import { semantic } from '@styles/semantic';
import styled from 'styled-components';

type CheckButtonProps = {
  onClick: () => void;
};

const CheckButton = ({ onClick }: CheckButtonProps) => {
  return <CheckBtn onClick={onClick}>확인</CheckBtn>;
};

export default CheckButton;

const CheckBtn = styled.button`
  cursor: pointer;
  display: flex;
  height: 3rem;
  padding: var(--gap-sm, 0.75rem) var(--gap-md, 1rem);
  justify-content: center;
  align-items: center;
  gap: var(--gap-2xs, 0.5rem);
  align-self: stretch;
  flex: 1 0 0;
  border-radius: var(--radius-sm, 0.75rem);
  color: ${semantic.light.accent.solid.hero};
  ${INTERACTION.accent.subtle()}
`;
