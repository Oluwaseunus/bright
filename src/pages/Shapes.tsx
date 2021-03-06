import styled from 'styled-components';

import Nav from '../components/Nav';
import Items from '../components/Items';
import Filters from '../components/Filters';

const StyledBody = styled.div`
  width: var(--page-width);
  margin: 0 auto;
`;

export default function Shapes() {
  return (
    <>
      <Nav />

      <StyledBody>
        <Filters />
        <Items />
      </StyledBody>
    </>
  );
}
