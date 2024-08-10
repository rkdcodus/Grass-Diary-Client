import styled from 'styled-components';

import { ReactComponent as LogoText } from '@svg/logo.svg';
import logoIcon from '@image/sampleLogo_white.png';
import { semantic } from '@styles/semantic';
import { TYPO } from '@styles/typo';

const Footer = () => {
  return (
    <FooterContainer>
      <ContentWrap>
        <LogoWrap>
          <LogoIcon src={logoIcon} />
          <LogoText fill={semantic.light.base.solid.white} />
        </LogoWrap>
        <CopyRight>
          Copyright © 2024 Jandi Diary. All rights reserved.
        </CopyRight>
      </ContentWrap>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  align-self: stretch;
  display: flex;
  padding: var(--gap-xl, 24px);
  justify-content: center;
  align-items: center;
  gap: var(--gap-xl, 24px);

  border-radius: var(--radius-empty, 0px);
  border-top: var(--stroke-thicker, 4px) solid
    ${semantic.light.accent.solid.hero};
  opacity: var(--opacity-visible, 1);
  background: ${semantic.light.base.solid.darkgray};
`;

const ContentWrap = styled.div`
  display: flex;
  max-width: var(--vw-desktop-min, 960px);
  padding: var(--gap-empty, 0px);
  align-items: center;
  gap: var(--gap-empty, 0px);
  align-self: stretch;
  flex: 1;
`;

const LogoWrap = styled.div`
  display: flex;
  padding: var(--gap-empty, 0px);
  align-items: center;
  gap: var(--gap-xs, 10px);
  flex: 1 0 0;
  border-radius: var(--radius-empty, 0px);
  opacity: var(--opacity-visible, 1);
`;

const LogoIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const CopyRight = styled.p`
  color: ${semantic.light.base.solid.white};
  ${TYPO.caption2}
`;
