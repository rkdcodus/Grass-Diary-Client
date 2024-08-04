import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}

const ButtonContainer = ({ children }: Props) => {
  return <Btn>{children}</Btn>;
};

export default ButtonContainer;

const Btn = styled.div`
  position: relative;
  display: inline-flex;
  white-space: nowrap;
`;
