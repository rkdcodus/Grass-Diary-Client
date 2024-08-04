import styled from 'styled-components';
import { semantic } from '@styles/semantic';
import { TYPO } from '@styles/typo';

import Interaction1 from '@components/Interactions/Interaction1';
import ButtonContainer from '@components/Button/ButtonContainer';

import { Link } from 'react-router-dom';

interface MenuProps {
  text: string;
  svg: string;
  link?: string;
  onClick?: () => void;
  line?: number;
  topRadius?: number;
  bottomRadius?: number;
}

const Menu = ({
  link,
  onClick,
  text,
  svg,
  line,
  topRadius,
  bottomRadius,
}: MenuProps) => {
  return (
    <>
      <Link to={link || ''}>
        <ButtonContainer>
          <Interaction1
            onClick={onClick}
            topRadius={topRadius}
            bottomRadius={bottomRadius}
          />
          <MenuContainer>
            <MenuStr>{text}</MenuStr>
            <MenuImg src={svg} alt={text} />
          </MenuContainer>
        </ButtonContainer>
      </Link>
      <Line height={line} />
    </>
  );
};

export default Menu;

const MenuContainer = styled.div`
  width: 160px;
  display: flex;
  padding: var(--gap-md, 16px) var(--gap-lg, 20px);
  align-items: center;
  gap: var(--gap-md, 16px);
  align-self: stretch;

  border-radius: var(--radius-empty, 0px);
  opacity: var(--opacity-visible, 1);
`;

const Line = styled.div<{ height: number | undefined }>`
  height: ${props => props.height || 1}px;
  align-self: stretch;
  background: ${semantic.light.border.transparent.assistive};
`;

const MenuStr = styled.p`
  flex: 1 0 0;
  color: ${semantic.light.object.solid.normal};
  ${TYPO.label2};

  opacity: var(--opacity-visible, 1);
`;

const MenuImg = styled.img`
  display: flex;
  justify-content: center;
  text-align: center;
  width: 18px;
  height: 18px;
  opacity: var(--opacity-visible, 1);
`;
