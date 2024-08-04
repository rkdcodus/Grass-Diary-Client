import styled from 'styled-components';
import { semantic } from '@styles/semantic';

import person from '@svg/person.svg';
import setting from '@svg/settings.svg';
import logout from '@svg/logout.svg';
import person_remove from '@svg/person_remove.svg';
import Menu from '@components/Button/Menu';

import useLogout from '@hooks/useLogout';
import { useQueryClient } from '@tanstack/react-query';

interface IMenuBarProps {
  toggle: boolean;
  headerRef: React.RefObject<HTMLDivElement>;
}

const MenuBar = ({ toggle, headerRef }: IMenuBarProps) => {
  const clearAuth = useLogout();
  const queryClient = useQueryClient();
  const handleLogout = () => {
    clearAuth();
    queryClient.resetQueries({ queryKey: ['memberId'] });
  };

  const deleteAccount = () => {
    console.log('준비 중 입니다.');
  };

  return (
    <MenusContainer ref={headerRef} toggle={toggle}>
      <Menu link={'/mypage'} text={'마이페이지'} svg={person} line={4} />
      <Menu link={'/setting'} text={'설정'} svg={setting} />
      <Menu onClick={handleLogout} text={'로그아웃'} svg={logout} />
      <Menu onClick={deleteAccount} text={'탈퇴'} svg={person_remove} />
    </MenusContainer>
  );
};

export default MenuBar;

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
