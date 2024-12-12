import { InitialState } from "@ngrx/store/src/models";
import { User } from "../user.model";
import { initialState } from "./user.state";
import { createReducer, on } from "@ngrx/store";
import { dashboardEditSuccess, dashboardSuccess } from "./user.action";
import { each } from "jquery";

export const _dashboardReducer= createReducer(
    initialState,
    on(dashboardSuccess,(state,action)=>{
        return {
            ...state,
            users : action.users
        }
    }),
    on(dashboardEditSuccess,(state,action)=>{
        console.log('edit success called',action.user)
        const users = state.users.slice()
       const updatedUsers = users.map(each => {
            if(each._id === action.user._id){
                return action.user
            }else{
                return each;
            }
        })

        console.log(updatedUsers)
        return {
            ...state,
            users : updatedUsers
        }
    })
)


export function dashboardReducer (state : any,action : any){
    return _dashboardReducer(state,action)
}




