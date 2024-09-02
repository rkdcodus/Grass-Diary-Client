import styled from 'styled-components';
import { semantic } from '@styles/semantic';

import sampleLogo from '@image/sampleLogo.png';
import { ReactComponent as LogoSVG } from '@svg/logo.svg';

import MenuBar from './MenuBar';
import { Profile } from '@components/index';

import { useNavigate } from 'react-router-dom';
import { useUser } from '@state/user/useUser';
import { INTERACTION } from '@styles/interaction';
import { TYPO } from '@styles/typo';

const Header = () => {
  const memberId = useUser();
  const navigate = useNavigate();

  return (
    <NavBar>
      <ContentWrap>
        <LogoContainer>
          <Logo onClick={() => navigate('/main')}>
            <LogoImg />
            <LogoStr />
          </Logo>
        </LogoContainer>
        <FeedButton onClick={() => navigate('/share')}>피드</FeedButton>
        {memberId ? (
          <RightContent>
            <Profile width="2rem" height="2rem" />
            <MenuBar />
          </RightContent>
        ) : (
          <LoginBtn onClick={() => console.log('로그인')}>로그인</LoginBtn>
        )}
      </ContentWrap>
    </NavBar>
  );
};

export default Header;

const FeedButton = styled.button`
  cursor: pointer;
  display: flex;
  padding: var(--gap-5xs, 0.125rem) var(--gap-sm, 0.75rem);
  justify-content: center;
  align-items: center;
  border-radius: var(--radius-xs, 0.5rem);
  color: ${semantic.light.object.solid.normal};
  text-align: center;
  white-space: nowrap;
  ${TYPO.title1}

  ${INTERACTION.default.normal()}
`;

const NavBar = styled.header`
  display: flex;
  padding: var(--gap-xs, 0.625rem) var(--gap-xl, 1.5rem);
  justify-content: center;
  align-items: center;

  border-bottom: var(--stroke-thin, 1px) solid
    ${semantic.light.border.transparent.alternative};
  background: ${semantic.light.bg.solid.subtlest};
`;

const ContentWrap = styled.div`
  display: flex;
  max-width: var(--vw-desktop-min, 60rem);
  align-items: center;
  gap: var(--gap-lg, 1.25rem);
  flex: 1 0 0;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1 0 0;
`;

const Logo = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--gap-xs, 0.625rem);
`;

const LogoImg = styled.div`
  width: 1.5rem;
  height: 1.5rem;

  background: url(${sampleLogo});
  background-size: contain;
`;

const LogoStr = styled(LogoSVG)`
  width: 4.47663rem;
  height: 1.125rem;
  fill: ${semantic.light.object.solid.normal};
`;

const RightContent = styled.div`
  display: flex;
  align-items: center;
  gap: var(--gap-2xs, 0.5rem);
`;

const LoginBtn = styled.button`
  display: flex;
  background: none;
  padding: var(--gap-xs, 0.625rem) var(--gap-md, 1rem);
  justify-content: center;
  align-items: center;

  gap: var(--gap-2xs, 0.5rem);
  color: ${semantic.light.base.solid.white};
  border-radius: var(--radius-xs, 0.5rem);
  background: ${semantic.light.accent.solid.normal};

  ${INTERACTION.default.normal(semantic.light.accent.solid.normal)}
`;
