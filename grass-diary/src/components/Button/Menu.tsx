import styled from 'styled-components';
import { semantic } from '@styles/semantic';
import { TYPO } from '@styles/typo';
import { INTERACTION } from '@styles/interaction';

interface MenuProps {
  text: string;
  svg: string;
  onClick?: () => void;
  line?: number;
  color?: string;
}

const Menu = ({ onClick, text, svg, line, color }: MenuProps) => {
  return (
    <>
      <MenuContainer onClick={onClick}>
        <MenuStr color={color}>{text}</MenuStr>
        <MenuImg src={svg} alt={text} />
      </MenuContainer>
      <Line height={line} />
    </>
  );
};

export default Menu;

const MenuContainer = styled.button`
  width: 10rem;
  display: flex;
  padding: var(--gap-md, 1rem) var(--gap-lg, 1.25rem);
  align-items: center;
  gap: var(--gap-md, 1rem);
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
