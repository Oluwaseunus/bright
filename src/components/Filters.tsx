import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../store';
import { filters } from '../data.json';
import { addShape, removeShape } from '../store/actions/shapes';
import { addColour, removeColour } from '../store/actions/colours';

const { shapes, colours } = filters;

export default function Filters() {
  const dispatch = useDispatch();
  const shapesInStore = useSelector((state: RootState) => state.shapes);
  const coloursInStore = useSelector((state: RootState) => state.colours);

  function filterColour(colour: string) {
    return function () {
      if (coloursInStore.includes(colour)) {
        dispatch(removeColour(colour));
      } else {
        dispatch(addColour(colour));
      }
    };
  }

  function filterShape(shape: string) {
    return function () {
      if (shapesInStore.includes(shape)) {
        dispatch(removeShape(shape));
      } else {
        dispatch(addShape(shape));
      }
    };
  }

  return (
    <div>
      <p>Filters</p>
      <div>
        {shapes.map(shape => (
          <button onClick={filterShape(shape)} type="button" key={shape}>
            {shape}
          </button>
        ))}
      </div>
      <div>
        {colours.map(colour => (
          <button onClick={filterColour(colour)} type="button" key={colour}>
            {colour}
          </button>
        ))}
      </div>
    </div>
  );
}
