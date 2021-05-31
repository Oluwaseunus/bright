import { filters } from '../../data.json';
import { addShape, removeShape } from '../../store/actions/shapes';
import reducer, { ShapeActions } from '../../store/reducers/shapes';

describe('Shapes Reducer', () => {
  it('should return the initial state', () => {
    const invalidState = { type: '', shape: 'Oval' };

    expect(reducer(undefined, invalidState as ShapeActions)).toEqual(
      filters.shapes
    );
  });

  it('should handle add_shape action', () => {
    const shape = filters.shapes[0];
    const addShapeAction = addShape(shape);
    expect(reducer([], addShapeAction)).toEqual([shape]);
  });

  it('should handle remove_shape action', () => {
    // filters only the shape when all filters are selected
    let shape = filters.shapes[0];
    const removeShapeAction = removeShape(shape);
    expect(reducer(filters.shapes, removeShapeAction)).toEqual([shape]);

    // select only some of the filters
    const selectedFilters = filters.shapes.slice(1);
    // update action to remove from one of the remaining filters
    removeShapeAction.shape = filters.shapes[3];
    const expectedRemainingFilters = selectedFilters.filter(
      filter => filter !== filters.shapes[3]
    );
    expect(reducer(selectedFilters, removeShapeAction)).toEqual(
      expectedRemainingFilters
    );

    expect(reducer([shape], removeShapeAction)).toEqual(filters.shapes);
  });
});
