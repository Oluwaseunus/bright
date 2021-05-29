interface LogInAction {
  type: 'log_in';
}

interface LogOutAction {
  type: 'log_out';
}

type AuthActions = LogInAction | LogOutAction;

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
