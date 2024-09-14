import styled from 'styled-components';

const Spacer = () => {
  return (
    <>
      <Section />
    </>
  );
};

export default Spacer;

const Section = styled.div`
  height: 7.5rem;
  max-width: var(--vw-desktop-min, 60rem);
  align-self: stretch;
`;
