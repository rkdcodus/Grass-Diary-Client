import { semantic } from '@styles/semantic';
import { API_URI } from '@services/index';
import Divider from '@components/Divider';
import * as S from '@styles/Intro/LoginModal';

const LoginModal = ({ isOpen, isClose }: ILoginModalProps) => {
  if (!isOpen) return null;

  const handleGoogleLogin: TGoogleLogin = () => {
    window.open(`${API_URI}/api/auth/google`, '_self');
  };

  return (
    <S.ModalBox>
      <S.ModalHeader>
        <S.ModalTitleText>회원가입 및 로그인</S.ModalTitleText>
        <S.CloseButton onClick={isClose}>
          <S.CloseImg src="/assets/icons/dialog-icon-btn-close.svg" />
        </S.CloseButton>
      </S.ModalHeader>
      <Divider
        width="22.5rem"
        color={semantic.light.border.transparent.alternative}
      />
      <S.ButtonBox>
        <button onClick={handleGoogleLogin}>
          <img src="/assets/img/googleLogin.png" />
        </button>
        <S.TermText>
          로그인 시, <S.TermAnchor href="#">서비스 이용약관</S.TermAnchor>에
          동의하는 것으로 간주됩니다.
        </S.TermText>
      </S.ButtonBox>
    </S.ModalBox>
  );
};

export default LoginModal;
