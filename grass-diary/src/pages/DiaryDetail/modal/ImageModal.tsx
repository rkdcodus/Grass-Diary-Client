import { semantic } from '@styles/semantic';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ReactComponent as CloseSvg } from '@svg/close.svg';
import { TYPO } from '@styles/typo';

const ImageModal = ({ img, setImageModal }: ImageModalProps) => {
  const imageRef = useRef(null);

  const close = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target === imageRef.current) return;
    setImageModal(false);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <Background onClick={close}>
      <ImageWrap>
        <CloseWrap onClick={close}>
          <CloseText>닫기</CloseText>
          <CloseIcon />
        </CloseWrap>
        <Image src={img} ref={imageRef} />
      </ImageWrap>
    </Background>
  );
};

export default ImageModal;

const Background = styled.div`
  z-index: 1;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
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
  cursor: pointer;
  margin-left: auto;
`;

const CloseText = styled.span`
  ${TYPO.label3}
  color: ${semantic.light.inverse.solid.normal};
  text-align: center;
`;

const CloseIcon = styled(CloseSvg)`
  width: 20px;
  height: 20px;
  fill: ${semantic.light.inverse.solid.normal};
`;

const Image = styled.img`
  max-width: 80vw;
  max-height: 80vh;
`;
