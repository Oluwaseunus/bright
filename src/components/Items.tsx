import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { RootState } from '../store';
import { items, filters } from '../data.json';

const StyledShapeItem = styled.div`
  width: 100%;
  height: 20rem;
  display: flex;
  background: white;
  justify-content: center;
  align-items: center;
`;

const StyledShape = styled.div`
  --clip-path: inset(0);

  width: 11.25rem;
  height: 11.25rem;
  clip-path: var(--clip-path);
  background: ${props => props.color};

  &[data-shape='Oval'] {
    --clip-path: ellipse(30% 40% at 50% 50%);
  }

  &[data-shape='Round'] {
    --clip-path: circle(50% at 50% 50%);
  }

  &[data-shape='Triangle'] {
    --clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  }

  &[data-shape='Rectangle'] {
    --clip-path: inset(15% 0);
  }
`;

const StyledItems = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const StyledItemsPage = styled.div`
  p {
    font-size: 2rem;
    font-weight: bold;
    text-transform: capitalize;

    span {
      font-size: 1.6rem;
      font-weight: normal;
    }
  }
`;

function generateHeader(shapes: string[], colours: string[]): string {
  const shapesLength = shapes.length;
  const coloursLength = colours.length;
  const maxShapesLength = filters.shapes.length;
  const maxColoursLength = filters.colours.length;
  const allItemsLength = maxShapesLength + maxColoursLength;

  if (shapesLength + coloursLength === allItemsLength) return 'All Items';
  else if (shapesLength === maxShapesLength) {
    if (coloursLength === 1) return `All ${colours[0]} items`;
  } else if (coloursLength === maxColoursLength) {
    if (shapesLength === 1) return `All ${shapes[0]} items`;
  } else if (coloursLength === 1 && shapesLength === 1)
    return `${colours[0]} ${shapes[0]} Items`;
  return `Multiple Items`;
}

export default function Items() {
  const shapesInStore = useSelector((state: RootState) => state.shapes);
  const coloursInStore = useSelector((state: RootState) => state.colours);

  const filteredItems = items.filter(
    item =>
      shapesInStore.includes(item.shape) && coloursInStore.includes(item.colour)
  );

  return (
    <StyledItemsPage>
      <p>
        {generateHeader(shapesInStore, coloursInStore)}.
        <span> ({filteredItems.length})</span>
      </p>

      <StyledItems>
        {filteredItems.map(({ shape, colour }) => (
          <StyledShapeItem key={`${shape}+${colour}`}>
            <StyledShape color={colour} data-shape={shape} />
          </StyledShapeItem>
        ))}
      </StyledItems>
    </StyledItemsPage>
  );
}
