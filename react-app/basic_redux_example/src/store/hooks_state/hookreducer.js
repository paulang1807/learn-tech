import * as ACTION_TYPES from '../actions/action_types'

export const initState = {
    prop1: "false",
    prop2: "false"
}

export const HookReducer = (state = initState, action) => {
    switch (action.type) {
        case ACTION_TYPES.SUCCESS:
            return {
                ...state,
                prop1: "true",
                prop2: "true"
            }   
        case ACTION_TYPES.FAILURE:
            return {
                ...state,
                prop1: "false",
                prop2: "false"
            }
        default:
            return state
    }
}

