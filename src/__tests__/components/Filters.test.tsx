import * as reactRedux from 'react-redux';
import { filters } from '../../data.json';
import { render, screen, fireEvent } from '../../test-utils';

import Filters from '../../components/Filters';

describe('Filters', () => {
  const dummyDispatch = jest.fn();
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();

    useSelectorMock.mockReturnValue([filters.shapes, filters.colours]);
    useDispatchMock.mockReturnValue(dummyDispatch);
  });

  test('all filters are selected on load', () => {
    const { container } = render(<Filters />);
    expect(screen.getByText(/filters/i)).toBeInTheDocument();

    expect(container.querySelectorAll('button.active').length).toEqual(
      Object.values(filters).flat().length
    );
  });

  test('clicking on a filter dispatches an action', () => {
    const { getByText, getByTitle } = render(<Filters />);
    expect(useDispatchMock).toHaveBeenCalledTimes(1);
    expect(dummyDispatch).not.toHaveBeenCalled();

    const {
      shapes: [firstShape],
      colours: [firstColour],
    } = filters;

    fireEvent.click(getByText(firstShape));
    expect(dummyDispatch).toHaveBeenCalledTimes(1);

    fireEvent.click(getByTitle(firstColour));
    expect(dummyDispatch).toHaveBeenCalledTimes(2);
  });
});
