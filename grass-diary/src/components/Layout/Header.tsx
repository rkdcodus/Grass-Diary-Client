import * as S from '@styles/component/Layout/Header.style';
import sampleLogo from '@image/sampleLogo.png';
import MenuBar from './MenuBar';
import { Profile } from '@components/index';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@state/user/useUser';
import { useModal } from '@state/modal/useModal';
import { useEffect } from 'react';
import { MODAL } from '@constants/message';
import { semantic } from '@styles/semantic';
import { INTERACTION } from '@styles/interaction';

const Header = () => {
  const { memberId, isError } = useUser();
  const { modal, loginModal } = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    const manualLogout = localStorage.getItem('manualLogout');
    if (isError && manualLogout === null) {
      const setting = {
        title: MODAL.login_expiration.title,
        content: MODAL.login_expiration.content,
      };

      const button1 = {
        active: true,
        text: MODAL.confirm,
        color: semantic.light.accent.solid.hero,
        interaction: INTERACTION.accent.subtle(),
      };

      localStorage.removeItem('accessToken');
      modal(setting, button1);
    }
  }, [isError]);

  return (
    <S.Header>
      <S.Container>
        <S.LogoBox>
          <S.LogoButton onClick={() => navigate('/main')}>
            <S.LogoImage src={sampleLogo} />
            <S.LogoIcon />
          </S.LogoButton>
        </S.LogoBox>
        <S.FeedButton onClick={() => navigate('/share')}>피드</S.FeedButton>
        {memberId ? (
          <S.MenuBarBox>
            <Profile width="2rem" height="2rem" />
            <MenuBar />
          </S.MenuBarBox>
        ) : (
          <S.LoginButton onClick={loginModal}>로그인</S.LoginButton>
        )}
      </S.Container>
    </S.Header>
  );
};

export default Header;
