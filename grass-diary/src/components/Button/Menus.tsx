import styled from 'styled-components';
import { semantic } from '@styles/semantic';
import { ReactNode, useEffect, useRef, useState } from 'react';

interface MenusProps {
  children: ReactNode;
  icon: string;
}

const Menus = ({ children, icon }: MenusProps) => {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  const dropDown = () => setOpen(current => !current);

  useEffect(() => {
    const closeMenus = (event: MouseEvent) => {
      if (open && boxRef.current && iconRef.current) {
        if (
          !boxRef.current.contains(event.target as HTMLElement) &&
          !iconRef.current.contains(event.target as HTMLElement)
        )
          setOpen(false);
      }
    };

    document.addEventListener('click', closeMenus);

    return () => document.removeEventListener('click', closeMenus);
  }, [open]);

  return (
    <div onClick={dropDown} ref={iconRef}>
      <Icon src={icon} />
      <MenusContainer $toggle={open} ref={boxRef}>
        {children}
      </MenusContainer>
    </div>
  );
};

export default Menus;

const MenusContainer = styled.div<{ $toggle: boolean }>`
  display: flex;
  width: 10rem;
  height: ${props => (props.$toggle ? 'auto' : '0rem')};
  flex-direction: column;
  align-items: flex-start;

  border-radius: var(--radius-md, 1rem);
  background: ${semantic.light.bg.solid.normal};

  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.06),
    0px 2px 4px 0px rgba(0, 0, 0, 0.06), 0px 4px 8px 0px rgba(0, 0, 0, 0.13);

  position: absolute;
  transform: translate(-8.25rem, 1rem);
  overflow: hidden;
  z-index: 998;
`;

const Icon = styled.img`
  cursor: pointer;
`;
