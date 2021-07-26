import * as ACTION_TYPES from '../actions/action_types'

const initState = {
    prop1: "false"
}

const Reducer1 = (state = initState, action) => {
    switch (action.type) {
        case ACTION_TYPES.SUCCESS:
            return {
                ...state,
                prop1: "true"
            }
        case ACTION_TYPES.FAILURE:
            return {
                ...state,
                prop1: "false"
            }
        default:
            return state
    }
}

export default Reducer1