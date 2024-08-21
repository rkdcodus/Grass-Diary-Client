import styled from 'styled-components';
import { semantic } from '@styles/semantic';
import { TYPO } from '@styles/typo';

import { Link } from 'react-router-dom';
import { INTERACTION } from '@styles/interaction';

interface MenuProps {
  text: string;
  svg: string;
  link?: string;
  onClick?: () => void;
  line?: number;
  topRadius?: number;
  bottomRadius?: number;
  color?: string;
}

type MenuContainerProps = {
  $topRadius?: number;
  $bottomRadius?: number;
};

const Menu = ({
  link,
  onClick,
  text,
  svg,
  line,
  topRadius,
  bottomRadius,
  color,
}: MenuProps) => {
  return (
    <>
      <Link to={link || ''}>
        <MenuContainer
          onClick={onClick}
          $topRadius={topRadius}
          $bottomRadius={bottomRadius}
        >
          <MenuStr color={color}>{text}</MenuStr>
          <MenuImg src={svg} alt={text} />
        </MenuContainer>
      </Link>
      <Line height={line} />
    </>
  );
};

export default Menu;

const MenuContainer = styled.button<MenuContainerProps>`
  width: 10rem;
  display: flex;
  padding: var(--gap-md, 1rem) var(--gap-lg, 1.25rem);
  align-items: center;
  gap: var(--gap-md, 1rem);
  border-top-left-radius: ${props => props.$topRadius || 0}rem;
  border-top-right-radius: ${props => props.$topRadius || 0}rem;
  border-bottom-left-radius: ${props => props.$bottomRadius || 0}rem;
  border-bottom-right-radius: ${props => props.$bottomRadius || 0}rem;
  ${INTERACTION.default.normal()}
`;

const Line = styled.div<{ height: number | undefined }>`
  height: ${props => props.height || 0.0625}rem;
  align-self: stretch;
  background: ${semantic.light.border.transparent.assistive};
`;

const MenuStr = styled.p<{ color?: string }>`
  ${TYPO.label2};
  flex: 1 0 0;
  color: ${props => props.color || semantic.light.object.solid.normal};
  text-align: left;
`;

const MenuImg = styled.img`
  display: flex;
  justify-content: center;
  text-align: center;
  width: 1.125rem;
  height: 1.125rem;
`;
