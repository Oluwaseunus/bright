import * as reactRedux from 'react-redux';

import Items from '../../components/Items';
import { items, filters } from '../../data.json';
import { render, screen } from '../../test-utils';

describe('Items', () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();

    useDispatchMock.mockReturnValue(jest.fn());
  });

  test('all items are selected on load', () => {
    useSelectorMock.mockReturnValue([filters.shapes, filters.colours]);

    render(<Items />);
    expect(screen.getByText(/All Items/i)).toBeInTheDocument();

    expect(screen.getByTitle(/number of items/i).innerHTML).toContain(
      items.length
    );

    expect(screen.getAllByRole('listitem').length).toEqual(items.length);
  });

  test('an appropriate header is shown based on the number of elements', () => {
    const [firstShape, secondShape] = filters.shapes;
    const [firstColour, secondColour] = filters.colours;

    useSelectorMock.mockReturnValue([[firstShape], filters.colours]);

    function countItemList([shapes, colours]: string[][]) {
      const numberOfValidItemsString = String(
        items.filter(
          ({ shape, colour }) =>
            shapes.includes(shape) && colours.includes(colour)
        ).length
      );

      expect(screen.getByTitle(/number of items/i)).toHaveTextContent(
        numberOfValidItemsString
      );
    }

    const { rerender } = render(<Items />);

    expect(
      screen.getByText(new RegExp(`All ${firstShape} items`, 'i'))
    ).toBeInTheDocument();

    let store = [[firstShape, secondShape], filters.colours];

    useSelectorMock.mockReturnValue(store);

    rerender(<Items />);

    expect(screen.getByText(/multiple items/i)).toBeInTheDocument();
    countItemList(store);

    store = [filters.shapes, [firstColour, secondColour]];

    useSelectorMock.mockReturnValue(store);

    rerender(<Items />);

    expect(screen.getByText(/multiple items/i)).toBeInTheDocument();
    countItemList(store);

    store = [filters.shapes, [firstColour]];
    useSelectorMock.mockReturnValue(store);

    rerender(<Items />);
    expect(screen.getByText(new RegExp(`All ${firstColour} items`, 'i')));
    countItemList(store);

    store = [[firstShape], [firstColour]];
    useSelectorMock.mockReturnValue(store);

    rerender(<Items />);
    expect(
      screen.getByText(new RegExp(`${firstColour} ${firstShape} items`, 'i'))
    ).toBeInTheDocument();
    countItemList(store);
  });
});
