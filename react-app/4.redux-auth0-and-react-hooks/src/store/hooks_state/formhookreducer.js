import * as ACTION_TYPES from '../actions/action_types'

export const initState = {
    user_text_change: "",
    user_text_submit: ""
}

export const UserHookReducer = (state = initState, action) => {
    switch (action.type) {
        case ACTION_TYPES.USER_INPUT_CHANGE:
            return {
                ...state,
                user_text_change: action.payload
            }   
        case ACTION_TYPES.USER_INPUT_SUBMIT:
            return {
                ...state,
                user_text_submit: action.payload
            }
        default:
            return state
    }
}

