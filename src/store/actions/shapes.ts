import { AddShapeAction, RemoveShapeAction } from '../reducers/shapes';

export function addShape(shape: string): AddShapeAction {
  return {
    type: 'add_shape',
    shape,
  };
}

export function removeShape(shape: string): RemoveShapeAction {
  return {
    type: 'remove_shape',
    shape,
  };
}
