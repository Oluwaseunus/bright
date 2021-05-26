import React from 'react';
import { useSelector } from 'react-redux';
import { items } from '../data.json';
import { RootState } from '../store';

export default function Items() {
  const shapesInStore = useSelector((state: RootState) => state.shapes);
  const coloursInStore = useSelector((state: RootState) => state.colours);

  return (
    <div>
      <p>Items</p>
      {items
        .filter(
          item =>
            shapesInStore.includes(item.shape) &&
            coloursInStore.includes(item.colour)
        )
        .map(({ shape, colour }) => (
          <div key={`${shape}+${colour}`}>
            {shape} {colour}
          </div>
        ))}
    </div>
  );
}
