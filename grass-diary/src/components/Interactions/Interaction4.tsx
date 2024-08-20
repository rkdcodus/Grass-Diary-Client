import styled from 'styled-components';
import { semantic } from '@styles/semantic';

const Interaction4 = ({
  onClick,
  topRadius,
  bottomRadius,
}: InteractionProps) => {
  return (
    <Interaction
      onClick={onClick}
      $topRadius={topRadius}
      $bottomRadius={bottomRadius}
    ></Interaction>
  );
};

export default Interaction4;

const Interaction = styled.button<InteractionStyleProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  border-top-left-radius: ${props => props.$topRadius || 0}rem;
  border-top-right-radius: ${props => props.$topRadius || 0}rem;
  border-bottom-left-radius: ${props => props.$bottomRadius || 0}rem;
  border-bottom-right-radius: ${props => props.$bottomRadius || 0}rem;
  background: rgba(0, 166, 110, 0);
  cursor: pointer;

  &:hover {
    background: rgba(0, 166, 110, 0.05);
  }

  &:active {
    background: rgba(0, 166, 110, 0.08);
  }

  &:focus {
    border: var(--stroke-thick, 2px) solid
      ${semantic.light.interactive.solid.focused};
  }
`;