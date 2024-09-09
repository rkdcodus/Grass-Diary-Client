import styled from 'styled-components';
import { semantic } from '@styles/semantic';
import { TYPO } from '@styles/typo';
import { ReactComponent as Close } from '@svg/close.svg';
import CustomButton from './CustomButton';
import {
  uesModalContent,
  useModalActions,
  useModalActive,
  useModalTitle,
} from '@state/modal/ModalStore';
import {
  useModalButton1,
  useModalButton2,
} from '@state/modal/ModalButtonStore';

const Modal = () => {
  const title = useModalTitle();
  const content = uesModalContent();
  const active = useModalActive();
  const button1 = useModalButton1();
  const button2 = useModalButton2();
  const { setActive } = useModalActions();

  return (
    <Background $active={active}>
      <ModalContainer>
        <TopSection>
          <Title>{title}</Title>
          <CloseBtn onClick={() => setActive(false)} />
        </TopSection>
        <Content>{content}</Content>
        <Divider />
        <BottomSection>
          <CustomButton
            text={button1.text}
            onClick={() => setActive(false)}
            color={button1.color}
            interaction={button1.interaction}
          />
          {button2.active && (
            <CustomButton
              text={button2.text}
              onClick={button2.onClick}
              color={button2.color}
              interaction={button2.interaction}
            />
          )}
        </BottomSection>
      </ModalContainer>
    </Background>
  );
};

export default Modal;

const Background = styled.div<{ $active: boolean }>`
  display: ${props => (props.$active ? 'block' : 'none')};
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
  width: 22.5rem;
  flex-direction: column;
  align-items: flex-start;

  border-radius: var(--radius-md, 1rem);
  background: ${semantic.light.bg.solid.normal};
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.08),
    0px 3px 8px 0px rgba(0, 0, 0, 0.12), 0px 8px 16px 0px rgba(0, 0, 0, 0.16);
`;

const TopSection = styled.div`
  display: flex;
  padding: var(--gap-md, 1rem) var(--gap-lg, 1.25rem) var(--gap-md, 1rem)
    var(--gap-xl, 1.5rem);
  align-items: center;
  gap: var(--gap-md, 1rem);
  align-self: stretch;
`;

const Title = styled.p`
  flex: 1 0 0;
  ${TYPO.title1}
  color: ${semantic.light.object.solid.normal};
`;

const CloseBtn = styled(Close)`
  cursor: pointer;
`;

const Content = styled.p`
  padding: var(--gap-md, 1rem) var(--gap-xl, 1.5rem) var(--gap-xl, 1.5rem)
    var(--gap-xl, 1.5rem);
  text-align: center;
  align-self: stretch;
  ${TYPO.body1}
  color: ${semantic.light.object.transparent.neutral};
`;

const Divider = styled.div`
  width: 22.5rem;
  height: 0.0625rem;

  background: ${semantic.light.border.transparent.assistive};
`;

const BottomSection = styled.div`
  display: flex;
  padding: var(--gap-2xs, 0.5rem);
  align-items: flex-start;
  gap: var(--gap-2xs, 0.5rem);
  align-self: stretch;
`;
