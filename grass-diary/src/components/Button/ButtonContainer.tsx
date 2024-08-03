import styled from 'styled-components';

const ButtonContainer = props => {
  return <Btn>{props.children}</Btn>;
};

export default ButtonContainer;

const Btn = styled.div`
  position: relative;
  display: inline-flex;
  white-space: nowrap;
`;
