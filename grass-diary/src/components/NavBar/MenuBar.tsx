import person from '@svg/person.svg';
import setting from '@svg/settings.svg';
import logout from '@svg/logout.svg';
import person_remove from '@svg/person_remove.svg';
import Menu from '@components/Button/Menu';
import arrow from '@svg/arrow_drop_down.svg';
import useLogout from '@hooks/useLogout';
import { useQueryClient } from '@tanstack/react-query';
import Menus from '@components/Button/Menus';
import { semantic } from '@styles/semantic';

const MenuBar = () => {
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
    <div>
      <Menus icon={arrow}>
        <Menu
          link={'/mypage'}
          text={'마이페이지'}
          svg={person}
          line={0.25}
          topRadius={1}
        />
        <Menu link={'/setting'} text={'설정'} svg={setting} />
        <Menu onClick={handleLogout} text={'로그아웃'} svg={logout} />
        <Menu
          onClick={deleteAccount}
          text={'탈퇴'}
          svg={person_remove}
          bottomRadius={1}
          color={semantic.light.feedback.solid.negative}
        />
      </Menus>
    </div>
  );
};

export default MenuBar;
