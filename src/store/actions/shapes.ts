export function addShape(shape: string) {
  return {
    type: 'add_shape',
    shape,
  };
}

export function removeShape(shape: string) {
  return {
    type: 'remove_shape',
    shape,
  };
}
