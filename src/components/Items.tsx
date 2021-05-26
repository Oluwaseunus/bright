import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../store';
import { items, filters } from '../data.json';

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

      {filteredItems.map(({ shape, colour }) => (
        <div key={`${shape}+${colour}`}>
          {shape} {colour}
        </div>
      ))}
    </div>
  );
}
