import * as ACTION_TYPES from '../actions/action_types';

const initState = {
    is_Authenticated: false
}

const AuthReducer = (state = initState, action) => {
    switch (action.type) {
        case ACTION_TYPES.LOGIN_SUCCESS:
            return {
                ...state,
                is_Authenticated: true
            }
        case ACTION_TYPES.LOGIN_FAILURE:
            return {
                ...state,
                is_Authenticated: false
            }
        default:
            return state;
    }
}

export default AuthReducer