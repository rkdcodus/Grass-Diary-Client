import styled from 'styled-components';
import { semantic } from '@styles/semantic';
import { TYPO } from '@styles/typo';

import { ReactComponent as LogoText } from '@svg/logo.svg';
import logoIcon from '@image/sampleLogo_white.png';
import { FOOTER } from '@constants/message';

const Footer = () => {
  return (
    <FooterContainer>
      <ContentWrap>
        <LogoWrap>
          <LogoIcon src={logoIcon} />
          <LogoText fill={semantic.light.base.solid.white} />
        </LogoWrap>
        <CopyRight>{FOOTER.copyright}</CopyRight>
      </ContentWrap>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  align-self: stretch;
  display: flex;
  padding: var(--gap-xl, 1.5rem);
  justify-content: center;
  align-items: center;
  gap: var(--gap-xl, 1.5rem);

  border-top: var(--stroke-thicker, 0.25rem) solid
    ${semantic.light.accent.solid.hero};
  background: ${semantic.light.base.solid.darkgray};
`;

const ContentWrap = styled.div`
  display: flex;
  max-width: var(--vw-desktop-min, 60rem);
  min-width: 20rem;
  align-items: center;
  align-self: stretch;
  flex: 1;

  @media screen and (max-width: 959px) {
    flex-direction: column;
    gap: var(--gap-md, 1rem);
  }
`;

const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  gap: var(--gap-xs, 0.625rem);
  flex: 1 0 0;
`;

const LogoIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

const CopyRight = styled.p`
  color: ${semantic.light.base.solid.white};
  ${TYPO.caption2}
`;
