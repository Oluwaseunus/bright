import { filters } from '../../data.json';

const initialState = filters.shapes;

interface AddShapeAction {
  type: 'add_shape';
  shape: string;
}

interface RemoveShapeAction {
  type: 'remove_shape';
  shape: string;
}

type ShapeActions = AddShapeAction | RemoveShapeAction;

export default function (state = initialState, action: ShapeActions) {
  switch (action.type) {
    case 'add_shape': {
      const shapes = Object.assign([], state);
      shapes.push(action.shape);
      return shapes;
    }

    case 'remove_shape': {
      if (state.length === 1) return initialState;
      else if (state.length === initialState.length) {
        return [action.shape];
      }

      const shapes = Object.assign([], state);
      const index = shapes.findIndex(shape => shape === action.shape);
      shapes.splice(index, 1);
      return shapes;
    }

    default:
      return state;
  }
}
