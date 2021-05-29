export interface LogInAction {
  type: 'log_in';
}

export interface LogOutAction {
  type: 'log_out';
}

export type AuthActions = LogInAction | LogOutAction;

export default function (state = false, action: AuthActions) {
  switch (action.type) {
    case 'log_in':
      return true;

    case 'log_out':
      return false;

    default:
      return state;
  }
}
