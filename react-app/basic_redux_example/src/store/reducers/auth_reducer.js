import * as ACTION_TYPES from '../actions/action_types';

const initState = {
    auth_prop: "false"
}

const AuthReducer = (state = initState, action) => {
    switch (action.type) {
        case ACTION_TYPES.LOGIN_SUCCESS:
            return {
                ...state,
                auth_prop: "true"
            }
        case ACTION_TYPES.LOGIN_FAILURE:
            return {
                ...state,
                auth_prop: "false"
            }
        default:
            return state;
    }
}

export default AuthReducer