import * as reactRedux from 'react-redux';
import { filters } from '../../data.json';
import { render, screen, fireEvent } from '../../test-utils';

import Filters from '../../components/Filters';

describe('Filters', () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();

    // The return values must be mocked in the order that they're called in the component
    useSelectorMock
      .mockReturnValueOnce(filters.shapes)
      .mockReturnValueOnce(filters.colours);

    const dummyDispatch = jest.fn();
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
    const { shapes, colours } = filters;
    expect(useDispatchMock).not.toHaveBeenCalled();

    const { getByText, getByTitle } = render(<Filters />);
    const [firstShape] = shapes;
    const [firstColour] = colours;

    fireEvent.click(getByText(firstShape));
    expect(useDispatchMock).toHaveBeenCalledTimes(1);

    fireEvent.click(getByTitle(firstColour));
    expect(useSelectorMock).toHaveBeenCalledTimes(2);
  });
});
