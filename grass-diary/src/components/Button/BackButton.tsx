import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as LeftArrow } from '@svg/chevron_left.svg';

interface IBackButtonProps {
  goBackTo?: string;
}

const BackButton = ({ goBackTo }: IBackButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const goBack = () => {
    if (goBackTo) {
      return navigate(goBackTo);
    }
    if (location.state === 'editcomplete') {
      return navigate(-2);
    }
    navigate(-1);
  };
  return <ArrowButton onClick={goBack} />;
};

export default BackButton;

const ArrowButton = styled(LeftArrow)`
  cursor: pointer;
`;
