export function addColour(colour: string) {
  return {
    type: 'add_colour',
    colour,
  };
}

export function removeColour(colour: string) {
  return {
    type: 'remove_colour',
    colour,
  };
}
