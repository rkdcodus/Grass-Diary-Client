import ButtonWrapper from '@components/Button/ButtonWrapper';
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
    <ButtonWrapper>
      <Interaction1 onClick={onClick} topRadius={12} bottomRadius={12} />
      <CustomBtn $color={color}>{text}</CustomBtn>
    </ButtonWrapper>
  );
};

export default CustomButton;

const CustomBtn = styled.div<{ $color?: string }>`
  cursor: pointer;
  align-self: stretch;
  display: flex;
  height: 3rem;
  padding: var(--gap-sm, 0.75rem) var(--gap-md, 1rem);
  justify-content: center;
  align-items: center;
  gap: var(--gap-2xs, 0.5rem);
  flex: 1 0 0;

  border-radius: var(--radius-sm, 0.75rem);
  color: ${props =>
    props.$color || semantic.light.object.transparent.alternative};
`;
