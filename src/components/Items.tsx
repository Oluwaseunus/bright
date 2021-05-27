import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { RootState } from '../store';
import { items, filters } from '../data.json';

const StyledShapeItem = styled.div`
  width: 20rem;
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
  gap: 1.5rem;
  justify-items: center;
  grid-template-columns: repeat(5, 1fr);
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
    return `${shapes[0]} ${colours[0]} Items`;
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
    <div>
      <h3>{generateHeader(shapesInStore, coloursInStore)}.</h3>
      <span>({filteredItems.length})</span>

      <StyledItems>
        {filteredItems.map(({ shape, colour }) => (
          <StyledShapeItem key={`${shape}+${colour}`}>
            <StyledShape color={colour} data-shape={shape} />
          </StyledShapeItem>
        ))}
      </StyledItems>
    </div>
  );
}
