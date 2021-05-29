import reducer, { AuthActions } from '../../store/reducers/auth';

describe('Auth Reducer', () => {
  it('should return the initial state', () => {
    const invalidState = { type: '' };
    expect(reducer(undefined, invalidState as AuthActions)).toEqual(false);
  });

  it('should handle log_in action', () => {
    expect(reducer(undefined, { type: 'log_in' })).toEqual(true);
  });

  it('should handle log_out action', () => {
    expect(reducer(undefined, { type: 'log_out' })).toEqual(false);
  });
});
