import { semantic } from '@styles/semantic';
import { useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as CloseSvg } from '@svg/close.svg';
import { TYPO } from '@styles/typo';

const ImageModal = ({ img, setImageModal }: ImageModalProps) => {
  const onClick = () => {
    setImageModal(false);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <Background>
      <ImageWrap>
        <CloseWrap onClick={onClick}>
          <CloseText>닫기</CloseText>
          <CloseIcon />
        </CloseWrap>
        <Image src={img} />
      </ImageWrap>
    </Background>
  );
};

export default ImageModal;

const Background = styled.div`
  z-index: 1;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  border-radius: var(--radius-empty, 0rem);
  opacity: var(--opacity-visible, 1);
  background: ${semantic.light.bg.transparent.dimmed};
`;

const ImageWrap = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
`;

const CloseWrap = styled.div`
  display: inline-flex;
  padding: var(--gap-3xs, 0.375rem) var(--gap-xs, 0.625rem);
  justify-content: center;
  align-items: center;
  gap: var(--gap-2xs, 0.5rem);

  border-radius: var(--radius-xs, 0.5rem);
  opacity: var(--opacity-visible, 1);
  cursor: pointer;
  margin-left: auto;
`;

const CloseText = styled.span`
  color: ${semantic.light.inverse.solid.normal};
  text-align: center;
  ${TYPO.label3}
`;

const CloseIcon = styled(CloseSvg)`
  fill: ${semantic.light.inverse.solid.normal};
`;

const Image = styled.img`
  max-width: 80vw;
  max-height: 90vh;
  objectfit: 'contain';
`;
