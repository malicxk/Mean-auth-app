import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from '../reducers/user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(
  selectUserState,
  (state: UserState) => {
    console.log('User state:', state.user);
    return state.user
  }
);

export const selectLoginLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading
);

export const selectLoginError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);