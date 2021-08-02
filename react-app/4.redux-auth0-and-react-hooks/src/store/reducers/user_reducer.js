import * as ACTION_TYPES from '../actions/action_types'

const initState = {
    prop2: "user input default"
}

const Reducer2 = (state = initState, action) => {
    switch (action.type) {
        case ACTION_TYPES.USER_INPUT:
            return {
                ...state,
                prop2: action.payload
            }
        default:
            return state
    }
}

export default Reducer2