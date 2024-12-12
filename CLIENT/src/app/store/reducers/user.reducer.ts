import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';
import { User } from '../../user.model';

export interface UserState {
  loading: boolean;
  error: string | null;
  user: User | null;
}

const initialState: UserState = {
  loading: false,
  error: null,
  user: null
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loginUser, state =>  {
    console.log('Login user action dispatched');
    return { ...state, loading: true, error: null };
  }),
  on(UserActions.loginUserSuccess, (state, { user }) => {
    console.log('state updated')
    return { ...state, loading: false, user: user }
  }),
  on(UserActions.loginUserFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
