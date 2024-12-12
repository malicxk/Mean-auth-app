import { createAction, props } from "@ngrx/store";
import { User } from "../user.model";

export const dashboardSuccess = createAction('[Dashboard] Success',props<{users : User[]}>())
export const dashboardFailed= createAction('[Dashboard] Failed')

export const dashboardEditSuccess = createAction('[Dashboard] EditSuccess',props<{user : User}>())
