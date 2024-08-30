import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as LeftArrow } from '@svg/chevron_left.svg';
import { INTERACTION } from '@styles/interaction';
import { semantic } from '@styles/semantic';

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
  return (
    <ArrowButton onClick={goBack}>
      <ArrowIcon />
    </ArrowButton>
  );
};

export default BackButton;

const ArrowButton = styled.button`
  display: flex;
  padding: var(--gap-4xs, 0.25rem);
  border-radius: var(--radius-2xs, 0.25rem);
  ${INTERACTION.default.normal()}
`;

const ArrowIcon = styled(LeftArrow)`
  width: 24px;
  height: 24px;
  fill: ${semantic.light.object.transparent.neutral};
  cursor: pointer;
`;
