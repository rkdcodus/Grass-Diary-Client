import ButtonWrapper from '@components/Button/ButtonWrapper';
import Interaction4 from '@components/Interactions/Interaction4';
import { semantic } from '@styles/semantic';
import styled from 'styled-components';

type CheckButtonProps = {
  onClick: () => void;
};

const CheckButton = ({ onClick }: CheckButtonProps) => {
  return (
    <ButtonWrapper>
      <Interaction4 onClick={onClick} topRadius={12} bottomRadius={12} />
      <CheckBtn>확인</CheckBtn>
    </ButtonWrapper>
  );
};

export default CheckButton;

const CheckBtn = styled.div`
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
`;
