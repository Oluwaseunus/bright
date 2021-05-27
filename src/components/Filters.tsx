import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../store';
import { filters } from '../data.json';
import { addShape, removeShape } from '../store/actions/shapes';
import { addColour, removeColour } from '../store/actions/colours';

const { shapes, colours } = filters;

const StyledFilters = styled.div`
  h3 {
    font-size: 2rem;
  }

  button.active {
    border: 1px solid var(--border-blue);
  }
`;

const StyledShapeButton = styled.button`
  width: fit-content;
  font-size: 1.6rem;
  margin: 0 1rem;
  padding: 0.5rem 1rem;
  border-radius: 5rem;
  border: none;
  cursor: pointer;
`;

const StyledColourButton = styled.button`
  border: none;
  width: 3rem;
  height: 3rem;
  margin: 0 1.5rem;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

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
    <StyledFilters>
      <h3>Filters</h3>
      <div>
        {shapes.map(shape => (
          <StyledShapeButton
            key={shape}
            type="button"
            onClick={filterShape(shape)}
            className={shapesInStore.includes(shape) ? 'active' : ''}
          >
            {shape}
          </StyledShapeButton>
        ))}
      </div>
      <h3>Colors</h3>
      <div>
        {colours.map(colour => (
          <StyledColourButton
            key={colour}
            type="button"
            color={colour}
            title={colour}
            onClick={filterColour(colour)}
            className={coloursInStore.includes(colour) ? 'active' : ''}
          >
            &nbsp;
          </StyledColourButton>
        ))}
      </div>
    </StyledFilters>
  );
}
