import { filters } from '../../data.json';
import { addColour, removeColour } from '../../store/actions/colours';
import reducer, { ColourActions } from '../../store/reducers/colours';

describe('Colours Reducer', () => {
  it('should return the initial state', () => {
    const invalidState = { type: '', colour: 'Red' };

    expect(reducer(undefined, invalidState as ColourActions)).toEqual(
      filters.colours
    );
  });

  it('should handle add_colour action', () => {
    const colour = filters.colours[0];
    const addColourAction = addColour(colour);
    expect(reducer([], addColourAction)).toEqual([colour]);
  });

  it('should handle remove_colour action', () => {
    // filters only the colour when all filters are selected
    let colour = filters.colours[0];
    const removeColourAction = removeColour(colour);
    expect(reducer(filters.colours, removeColourAction)).toEqual([colour]);

    // select only some of the filters
    const selectedFilters = filters.colours.slice(1);
    // update action to remove from one of the remaining filters
    removeColourAction.colour = filters.colours[3];
    const expectedRemainingFilters = selectedFilters.filter(
      filter => filter !== filters.colours[3]
    );
    expect(reducer(selectedFilters, removeColourAction)).toEqual(
      expectedRemainingFilters
    );

    expect(reducer([colour], removeColourAction)).toEqual(filters.colours);
  });
});
