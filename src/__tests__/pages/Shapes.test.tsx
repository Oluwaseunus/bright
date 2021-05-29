import Shapes from '../../pages/Shapes';
import { render, screen } from '../../test-utils';

describe('Shapes page', () => {
  it('renders all child components', () => {
    render(<Shapes />);
    expect(screen.getByText(/shapes/i)).toBeInTheDocument();
    expect(screen.getByText(/filters/i)).toBeInTheDocument();
    expect(screen.getByTitle(/number of items/i)).toBeInTheDocument();
  });
});
