import { createFeatureSelector, createSelector } from "@ngrx/store";
import { User } from "../user.model";

export const selectDashboardState = createFeatureSelector<{users : User[]}>('dashboard')

export const getUsersSelector = createSelector(
    selectDashboardState,
    (state) => state.users
)
