import Reducer1  from "./reducer1";
import Reducer2 from "./user_reducer";
import AuthReducer from "./auth_reducer";


import { combineReducers } from "redux";

const rootReducer = combineReducers ({
    reducer1: Reducer1,
    reducer2: Reducer2,
    auth_reducer: AuthReducer
})

export default rootReducer