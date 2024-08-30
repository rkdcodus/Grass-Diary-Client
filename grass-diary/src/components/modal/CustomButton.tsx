import { INTERACTION } from '@styles/interaction';
import { semantic } from '@styles/semantic';
import styled from 'styled-components';

type CustomButtonProps = {
  onClick: () => void;
  text: string;
  color?: string;
};

const CustomButton = ({ onClick, text, color }: CustomButtonProps) => {
  return (
    <CustomBtn onClick={onClick} $color={color}>
      {text}
    </CustomBtn>
  );
};

export default CustomButton;

const CustomBtn = styled.button<{ $color?: string }>`
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

  ${INTERACTION.default.normal()}
`;
