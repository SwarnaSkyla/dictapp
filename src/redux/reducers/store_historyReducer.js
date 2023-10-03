import { STORE_HISTORY } from "../actions/actionType";


const initialData=[]



export const store_historyReducer=(state=initialData,action)=>{
       switch(action.type){
        case STORE_HISTORY:
            return[
                ...state,
                action.data
            ]
        default:return state
       }

}