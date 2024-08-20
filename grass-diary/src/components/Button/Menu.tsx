import styled from 'styled-components';
import { semantic } from '@styles/semantic';
import { TYPO } from '@styles/typo';

import Interaction1 from '@components/Interactions/Interaction1';
import ButtonWrapper from '@components/Button/ButtonWrapper';

import { Link } from 'react-router-dom';

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
        <ButtonWrapper>
          <Interaction1
            onClick={onClick}
            topRadius={topRadius}
            bottomRadius={bottomRadius}
          />
          <MenuContainer>
            <MenuStr color={color}>{text}</MenuStr>
            <MenuImg src={svg} alt={text} />
          </MenuContainer>
        </ButtonWrapper>
      </Link>
      <Line height={line} />
    </>
  );
};

export default Menu;

const MenuContainer = styled.div`
  width: 10rem;
  display: flex;
  padding: var(--gap-md, 1rem) var(--gap-lg, 1.25rem);
  align-items: center;
  gap: var(--gap-md, 1rem);
  align-self: stretch;
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
`;

const MenuImg = styled.img`
  display: flex;
  justify-content: center;
  text-align: center;
  width: 1.125rem;
  height: 1.125rem;
`;
