import { semantic } from '@styles/semantic';
import styled from 'styled-components';

const Divider = () => {
  return <DividerLine />;
};

export default Divider;

const DividerLine = styled.div`
  width: 20rem;
  height: 0.0625rem;

  background: ${semantic.light.border.transparent.neutral};
`;
