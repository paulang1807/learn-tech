import * as ACTION_TYPES from '../actions/action_types'

const initState = {
    prop1: false
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case ACTION_TYPES.SUCCESS:
            return {
                ...state,
                prop1: true
            }
        case ACTION_TYPES.FAILURE:
            return {
                ...state,
                prop1: false
            }
        default:
            return state
    }
}

export default rootReducer