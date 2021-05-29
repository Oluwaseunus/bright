import { filters } from '../../data.json';

const initialState = filters.colours;

export interface AddColourAction {
  type: 'add_colour';
  colour: string;
}

export interface RemoveColourAction {
  type: 'remove_colour';
  colour: string;
}

export type ColourActions = AddColourAction | RemoveColourAction;

export default function (state = initialState, action: ColourActions) {
  switch (action.type) {
    case 'add_colour': {
      const colours = Object.assign([], state);
      colours.push(action.colour);
      return colours;
    }

    case 'remove_colour': {
      if (state.length === 1) return initialState;
      else if (state.length === initialState.length) {
        return [action.colour];
      }

      const colours = Object.assign([], state);
      const index = colours.findIndex(colour => colour === action.colour);
      colours.splice(index, 1);
      return colours;
    }

    default:
      return state;
  }
}
