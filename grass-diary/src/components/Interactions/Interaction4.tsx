import styled from 'styled-components';
import { semantic } from '@styles/semantic';

const Interaction4 = ({ onClick, radius }: InteractionProps) => {
  return <Interaction onClick={onClick} radius={radius}></Interaction>;
};

export default Interaction4;

const Interaction = styled.button<{ radius: number }>`
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  border-radius: ${props => props.radius}px;
  // opacity: var(--opacity-subtlest, 0);
  background: rgba(0, 166, 110, 1);

  &:hover {
    // opacity: var(--opacity-subtlest, 0.05);
    background: rgba(0, 166, 110, 0.05);
  }

  &:active {
    // opacity: var(--opacity-subtler, 0.08);
    background: rgba(0, 166, 110, 0.08);
  }

  &:focus {
    border: var(--stroke-thick, 2px) solid
      ${semantic.light.interactive.solid.focused};
    // opacity: var(--opacity-visible, 1);
  }
`;
