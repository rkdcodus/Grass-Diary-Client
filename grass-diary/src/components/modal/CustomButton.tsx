import ButtonContainer from '@components/Button/ButtonContainer';
import Interaction1 from '@components/Interactions/Interaction1';
import { semantic } from '@styles/semantic';
import styled from 'styled-components';

type CustomButtonProps = {
  onClick: () => void;
  text: string;
  color?: string;
};

const CustomButton = ({ onClick, text, color }: CustomButtonProps) => {
  return (
    <ButtonContainer>
      <Interaction1 onClick={onClick} topRadius={12} bottomRadius={12} />
      <CustomBtn $color={color}>{text}</CustomBtn>
    </ButtonContainer>
  );
};

export default CustomButton;

const CustomBtn = styled.div<{ $color?: string }>`
  cursor: pointer;
  align-self: stretch;
  display: flex;
  height: 48px;
  padding: var(--gap-sm, 12px) var(--gap-md, 16px);
  justify-content: center;
  align-items: center;
  gap: var(--gap-2xs, 8px);
  flex: 1 0 0;

  border-radius: var(--radius-sm, 12px);
  color: ${props =>
    props.$color || semantic.light.object.transparent.alternative};
`;
