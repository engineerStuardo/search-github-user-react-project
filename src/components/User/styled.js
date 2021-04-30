import styled from 'styled-components';

export const Wrapper = styled.div`
  padding-top: 2rem;
  display: grid;
  gap: 3rem 2rem;
  @media (min-width: 850px) {
    grid-template-columns: 1fr 1fr;
  }
`;
