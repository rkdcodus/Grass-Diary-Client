import styled from 'styled-components';
import { semantic } from '@styles/semantic';
import { ReactNode } from 'react';

interface MenusProps {
  children: ReactNode;
  toggle: boolean;
}

const Menus = ({ children, toggle }: MenusProps) => {
  return <MenusContainer toggle={toggle}>{children}</MenusContainer>;
};

export default Menus;

const MenusContainer = styled.div<{ toggle: boolean }>`
  display: flex;
  width: 160px;
  height: ${props => (props.toggle ? 'auto' : '0px')};
  padding: var(--gap-empty, 0px);
  flex-direction: column;
  align-items: flex-start;
  gap: var(--gap-empty, 0px);

  border-radius: var(--radius-md, 16px);
  opacity: var(--opacity-visible, 1);
  background: ${semantic.light.bg.solid.normal};

  /* shadow/floated */
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.06),
    0px 2px 4px 0px rgba(0, 0, 0, 0.06), 0px 4px 8px 0px rgba(0, 0, 0, 0.13);

  position: absolute;
  transform: translate(-92px, 11px);
  overflow: hidden;
  z-index: 998;
`;
