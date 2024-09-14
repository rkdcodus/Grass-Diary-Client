import styled from 'styled-components';
import { semantic } from '@styles/semantic';
import { TYPO } from '@styles/typo';
import { ReactComponent as Close } from '@svg/close.svg';
import CustomButton from './CustomButton';
import {
  useModalActions,
  useModalActive,
  useModalLogin,
  useModalSetting,
} from '@state/modal/ModalStore';
import {
  useModalButton1,
  useModalButton2,
} from '@state/modal/ModalButtonStore';

const Modal = () => {
  const login = useModalLogin();
  const setting = useModalSetting();
  const active = useModalActive();
  const button1 = useModalButton1();
  const button2 = useModalButton2();
  const { setLogin, setActive } = useModalActions();

  const handleGoogleLogin: TGoogleLogin = () => {
    window.open(`http://localhost:8080/api/auth/google`, '_self');
  };

  return (
    <Background $active={active}>
      <ModalContainer>
        <TopSection>
          <Title>{setting.title}</Title>
          <CloseBtn
            onClick={() => {
              setActive(false);
              setLogin(false);
            }}
          />
        </TopSection>
        {setting.content !== '' && <Content>{setting.content}</Content>}
        <Divider />
        {login ? (
          <LoginBox>
            <button
              onClick={() => {
                handleGoogleLogin();
                setLogin(false);
                setActive(false);
              }}
            >
              <img src="/assets/img/googleLogin.png" />
            </button>
            <TermText>
              로그인 시, <TermAnchor href="#">서비스 이용약관</TermAnchor>에
              동의하는 것으로 간주됩니다.
            </TermText>
          </LoginBox>
        ) : (
          <BottomSection>
            {button1.active && (
              <CustomButton
                text={button1.text}
                onClick={() => setActive(false)}
                color={button1.color}
                interaction={button1.interaction}
              />
            )}
            {button2.active && (
              <CustomButton
                text={button2.text}
                onClick={() => {
                  console.log(button2.clickHandler);
                  if (button2.clickHandler) button2.clickHandler();
                  setActive(false);
                }}
                color={button2.color}
                interaction={button2.interaction}
              />
            )}
          </BottomSection>
        )}
      </ModalContainer>
    </Background>
  );
};

export default Modal;

const Background = styled.div<{ $active: boolean }>`
  display: ${props => (props.$active ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;

  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 0rem 1rem;

  background: ${semantic.light.bg.transparent.dimmed};
  cursor: auto;
`;

const ModalContainer = styled.div`
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
  align-self: stretch;
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

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  gap: 1rem;
  padding: 1.5rem;
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
