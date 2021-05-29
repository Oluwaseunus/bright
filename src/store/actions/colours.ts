import { AddColourAction, RemoveColourAction } from '../reducers/colours';

export function addColour(colour: string): AddColourAction {
  return {
    type: 'add_colour',
    colour,
  };
}

export function removeColour(colour: string): RemoveColourAction {
  return {
    type: 'remove_colour',
    colour,
  };
}
