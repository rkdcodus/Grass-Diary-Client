import styled from 'styled-components';

import { TYPO } from '@styles/typo';
import { semantic } from '@styles/semantic';

const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;

  position: fixed;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 22.5rem;

  border-radius: 1rem;
  background: ${semantic.light.bg.solid.normal};

  box-shadow:
    0px 0px 4px 0px rgba(0, 0, 0, 0.08),
    0px 3px 8px 0px rgba(0, 0, 0, 0.12),
    0px 8px 16px 0px rgba(0, 0, 0, 0.16);
`;

const ModalHeader = styled.header`
  display: flex;
  align-items: center;
  align-self: stretch;

  gap: 1rem;
  padding: 1rem 1.25rem 1rem 1.5rem;
`;

const ModalTitleText = styled.span`
  flex: 1 0 0;

  ${TYPO.title1}
  color: ${semantic.light.object.solid.normal};
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;

  gap: 1rem;
  padding: 1.5rem;
`;

const CloseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 1rem;
  padding: 0.25rem;
`;

const CloseImg = styled.img`
  width: 1.25rem;
  height: 1.25rem;
`;

const TermText = styled.span`
  align-self: stretch;
  text-align: center;

  ${TYPO.caption1}
  color: ${semantic.light.object.transparent.assistive};
`;

const TermAnchor = styled.a`
  text-decoration: underline;

  ${TYPO.caption1};
  color: ${semantic.light.accent.solid.hero};
`;

export {
  ModalBox,
  ModalHeader,
  ModalTitleText,
  ButtonBox,
  CloseButton,
  CloseImg,
  TermText,
  TermAnchor,
};
