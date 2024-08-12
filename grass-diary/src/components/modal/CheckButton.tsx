import ButtonContainer from '@components/Button/ButtonContainer';
import Interaction4 from '@components/Interactions/Interaction4';
import { semantic } from '@styles/semantic';
import styled from 'styled-components';

type CheckButtonProps = {
  onClick: () => void;
};

const CheckButton = ({ onClick }: CheckButtonProps) => {
  return (
    <ButtonContainer>
      <Interaction4 onClick={onClick} topRadius={12} bottomRadius={12} />
      <CheckBtn>확인</CheckBtn>
    </ButtonContainer>
  );
};

export default CheckButton;

const CheckBtn = styled.div`
  cursor: pointer;
  display: flex;
  height: 48px;
  padding: var(--gap-sm, 12px) var(--gap-md, 16px);
  justify-content: center;
  align-items: center;
  gap: var(--gap-2xs, 8px);
  align-self: stretch;
  flex: 1 0 0;
  border-radius: var(--radius-sm, 12px);
  color: ${semantic.light.accent.solid.hero};
`;
