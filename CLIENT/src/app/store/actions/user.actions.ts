import { createAction, props } from "@ngrx/store";
import { User } from "../../user.model";


export const loginUser = createAction(
    '[User] Login User',
    props<{ username: string; password: string }>()
  );
  
  export const loginUserSuccess = createAction(
    '[User] Login User Success',
    props<{ user: User }>()
  );
  
  export const loginUserFailure = createAction(
    '[User] Login User Failure',
    props<{ error: string }>()
  );