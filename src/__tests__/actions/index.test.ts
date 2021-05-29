import { logIn, logOut } from '../../store/actions/auth';
import { addShape, removeShape } from '../../store/actions/shapes';
import { addColour, removeColour } from '../../store/actions/colours';

describe('Actions', () => {
  describe('Colour Actions', () => {
    const colour = 'Red';
    let expectedAction = {
      type: 'add_colour',
      colour,
    };

    it('should create an action to add a colour', () => {
      expect(addColour(colour)).toEqual(expectedAction);
    });

    it('should create an action to remove a colour', () => {
      expectedAction.type = 'remove_colour';
      expect(removeColour(colour)).toEqual(expectedAction);
    });
  });

  describe('Shape Actions', () => {
    const shape = 'Oval';
    let expectedAction = {
      type: 'add_shape',
      shape,
    };

    it('should create an action to add a shape', () => {
      expect(addShape(shape)).toEqual(expectedAction);
    });

    it('should create an action to remove a shape', () => {
      expectedAction.type = 'remove_shape';
      expect(removeShape(shape)).toEqual(expectedAction);
    });
  });

  describe('Auth Actions', () => {
    it('should create a login action', () => {
      expect(logIn()).toEqual({ type: 'log_in' });
    });

    it('should create a log out action', () => {
      expect(logOut()).toEqual({ type: 'log_out' });
    });
  });
});
