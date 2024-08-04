import styled from 'styled-components';
import { semantic } from '@styles/semantic';

import sampleLogo from '@image/sampleLogo.png';
import avatarBg from '@svg/avatarBg.svg';
import { ReactComponent as Arrow } from '@svg/arrow_drop_down.svg';
import { ReactComponent as LogoSVG } from '@svg/logo.svg';

import Interaction1 from '@components/Interactions/Interaction1';
import ButtonContainer from '@components/Button/ButtonContainer';
import MenuBar from '@components/NavBar/MenuBar';
import { Profile } from '@components/index';

import { Link } from 'react-router-dom';
import { Suspense, useEffect, useRef, useState } from 'react';
import useUser from '@recoil/user/useUser';

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const { memberId } = useUser();

  const dropDown = () => {
    setToggle(current => !current);
  };

  useEffect(() => {
    const closeToggle = (e: MouseEvent) => {
      if (
        toggle &&
        headerRef.current &&
        iconRef.current &&
        profileRef.current
      ) {
        if (
          !headerRef.current.contains(e.target as HTMLElement) &&
          !iconRef.current.contains(e.target as HTMLElement) &&
          !profileRef.current.contains(e.target as HTMLElement)
        )
          setToggle(false);
      }
    };

    document.addEventListener('click', closeToggle);

    return () => document.removeEventListener('click', closeToggle);
  }, [memberId, toggle]);

  return (
    <div>
      <NavBar>
        <ContentWrap>
          <LogoContainer>
            <Link to="/main">
              <Logo>
                <LogoImg />
                <LogoStr />
              </Logo>
            </Link>
          </LogoContainer>
          {memberId ? (
            <div onClick={dropDown}>
              <RightContent ref={profileRef}>
                <Suspense fallback={<img src={avatarBg}></img>}>
                  <Profile width="32px" height="32px" />
                </Suspense>

                <IconBtn ref={iconRef}>
                  <Arrow />
                </IconBtn>
              </RightContent>
              <MenuBar headerRef={headerRef} toggle={toggle} />
            </div>
          ) : (
            <ButtonContainer>
              <Interaction1
                onClick={() => console.log('로그인')}
                topRadius={8}
                bottomRadius={8}
              />
              <LoginBtn>로그인</LoginBtn>
            </ButtonContainer>
          )}
        </ContentWrap>
      </NavBar>
    </div>
  );
};

export default Header;

const NavBar = styled.div`
  display: flex;
  width: 100vw;
  padding: var(--gap-xs, 10px) var(--gap-xl, 24px);
  justify-content: center;
  align-items: center;
  gap: var(--gap-empty, 0px);

  border-radius: var(--radius-empty, 0px);
  border-bottom: var(--stroke-thin, 1px) solid
    ${semantic.light.border.transparent.alternative};
  opacity: var(--opacity-visible, 1);
  background: ${semantic.light.bg.solid.subtlest};
`;

const ContentWrap = styled.div`
  display: flex;
  max-width: var(--vw-desktop-min, 960px);
  padding: var(--gap-empty, 0px);
  align-items: center;
  gap: var(--gap-lg, 20px);
  flex: 1 0 0;

  border-radius: var(--radius-empty, 0px);
  opacity: var(--opacity-visible, 1);
`;

const LogoContainer = styled.div`
  display: flex;
  padding: var(--gap-empty, 0px);
  align-items: center;
  gap: var(--gap-empty, 0px);
  flex: 1 0 0;

  border-radius: var(--radius-empty, 0px);
  opacity: var(--opacity-visible, 1);
`;

const Logo = styled.div`
  display: flex;
  padding: var(--gap-empty, 0px);
  align-items: center;
  gap: var(--gap-xs, 10px);

  border-radius: var(--radius-empty, 0px);
  opacity: var(--opacity-visible, 1);
`;

const LogoImg = styled.div`
  width: 24px;
  height: 24px;

  border-radius: var(--radius-empty, 0px);
  opacity: var(--opacity-visible, 1);
  background: url(${sampleLogo});
  background-size: contain;
`;

const LogoStr = styled(LogoSVG)`
  width: 71.626px;
  height: 18px;
  opacity: var(--opacity-visible, 1);
  fill: red;
`;

const RightContent = styled.div`
  display: flex;
  padding: var(--gap-empty, 0px);
  align-items: center;
  gap: var(--gap-2xs, 8px);

  border-radius: var(--radius-empty, 0px);
  opacity: var(--opacity-visible, 1);
`;

const IconBtn = styled.div`
  display: flex;
  padding: var(--gap-4xs, 4px);
  justify-content: center;
  align-items: center;
  gap: var(--gap-md, 16px);

  border-radius: var(--radius-2xs, 4px);
  opacity: var(--opacity-visible, 1);
  cursor: pointer;
`;

const LoginBtn = styled.div`
  display: flex;
  background: none;
  padding: var(--gap-xs, 10px) var(--gap-md, 16px);
  justify-content: center;
  align-items: center;

  gap: var(--gap-2xs, 8px);
  color: ${semantic.light.base.solid.white};
  border-radius: var(--radius-xs, 8px);
  opacity: var(--opacity-visible, 1);
  background: ${semantic.light.accent.solid.normal};
`;
