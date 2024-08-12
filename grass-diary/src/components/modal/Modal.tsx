import styled from 'styled-components';
import { semantic } from '@styles/semantic';
import { TYPO } from '@styles/typo';
import { ReactComponent as Close } from '@svg/close.svg';
import { ReactNode } from 'react';

type ModalProps = {
  setClose: () => void;
  title: string;
  content: string;
  children: ReactNode;
};

const Modal = ({ setClose, title, content, children }: ModalProps) => {
  return (
    <Background>
      <ModalContainer>
        <TopSection>
          <Title>{title}</Title>
          <CloseBtn onClick={setClose} />
        </TopSection>
        <Content>{content}</Content>
        <Divider />
        <BottomSection>{children}</BottomSection>
      </ModalContainer>
    </Background>
  );
};

export default Modal;

const Background = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: ${semantic.light.bg.transparent.dimmed};
  cursor: auto;
`;

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  width: 360px;
  flex-direction: column;
  align-items: flex-start;

  border-radius: var(--radius-md, 16px);
  opacity: var(--opacity-visible, 1);
  background: ${semantic.light.bg.solid.normal};

  /* shadow/overlay */
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.08),
    0px 3px 8px 0px rgba(0, 0, 0, 0.12), 0px 8px 16px 0px rgba(0, 0, 0, 0.16);
`;

const TopSection = styled.div`
  display: flex;
  padding: var(--gap-md, 16px) var(--gap-lg, 20px) var(--gap-md, 16px)
    var(--gap-xl, 24px);
  align-items: center;
  gap: var(--gap-md, 16px);
  align-self: stretch;
`;

const Title = styled.p`
  flex: 1 0 0;

  color: ${semantic.light.object.solid.normal};

  ${TYPO.title1}
`;

const CloseBtn = styled(Close)`
  cursor: pointer;
`;

const Content = styled.p`
  padding: var(--gap-md, 16px) var(--gap-xl, 24px) var(--gap-xl, 24px)
    var(--gap-xl, 24px);
  text-align: center;
  align-self: stretch;
  color: ${semantic.light.object.transparent.neutral};

  ${TYPO.body1}
`;

const Divider = styled.div`
  width: 360px;
  height: 1px;

  background: ${semantic.light.border.transparent.assistive};
`;

const BottomSection = styled.div`
  display: flex;
  padding: var(--gap-2xs, 8px);
  align-items: flex-start;
  gap: var(--gap-2xs, 8px);
  align-self: stretch;
  //   justify-content: space-around;
`;
