import { useToastActive, useToastText } from '@state/toast/ToastStore';
import { semantic } from '@styles/semantic';
import { TYPO } from '@styles/typo';
import styled, { keyframes } from 'styled-components';

const Toast = () => {
  const text = useToastText();
  const active = useToastActive();

  return <ToastContainer $active={active}>{text}</ToastContainer>;
};

export default Toast;

const toastFadeIn = keyframes`
30% {
 top: 90%;
}
70% {
opacity: 1;
top: 90%;
}
100% {
opacity: 0;
top: 90%;
}
`;

const ToastContainer = styled.div<{ $active: boolean }>`
  position: fixed;
  top: 100%;
  left: 50%;
  transform: translate(-50%);

  padding: var(--gap-sm, 12px) var(--gap-xl, 24px);
  gap: var(--gap-2xs, 8px);

  border-radius: var(--radius-round, 96px);
  background: ${semantic.light.object.solid.hero};

  /* shadow/floated */
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.06),
    0px 2px 4px 0px rgba(0, 0, 0, 0.06), 0px 4px 8px 0px rgba(0, 0, 0, 0.13);

  color: ${semantic.light.inverse.solid.hero};
  text-align: center;
  ${TYPO.label2}
  transition: 1s;
  animation: ${props => props.$active && toastFadeIn} 4s 1s ease;
`;
