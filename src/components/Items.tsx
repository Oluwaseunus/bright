import React from 'react';
import { useSelector } from 'react-redux';
import { items, filters } from '../data.json';
import { RootState } from '../store';

export default function Items() {
  const shapesInStore = useSelector((state: RootState) => state.shapes);
  const coloursInStore = useSelector((state: RootState) => state.colours);

  const filteredShapesLength = shapesInStore.length;
  const filteredColoursLength = coloursInStore.length;

  let header;

  const numberOfFilters = Object.values(filters).flat().length;
  if (numberOfFilters === filteredShapesLength + filteredColoursLength) {
    header = 'All items';
  } else if (
    shapesInStore.length === 1 &&
    coloursInStore.length === filters.colours.length
  ) {
    header = `All ${shapesInStore[0]} items`;
  } else if (
    coloursInStore.length === 1 &&
    shapesInStore.length === filters.shapes.length
  ) {
    header = `All ${coloursInStore[0]} items`;
  } else header = 'Multiple items';

  const filteredItems = items.filter(
    item =>
      shapesInStore.includes(item.shape) && coloursInStore.includes(item.colour)
  );

  return (
    <div>
      <h3>{header}.</h3>
      <p>({filteredItems.length})</p>

      {filteredItems.map(({ shape, colour }) => (
        <div key={`${shape}+${colour}`}>
          {shape} {colour}
        </div>
      ))}
    </div>
  );
}
