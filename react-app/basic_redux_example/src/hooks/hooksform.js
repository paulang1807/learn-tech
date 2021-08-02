import React, { useState, useReducer, useContext } from 'react';
import * as Reducer from '../store/hooks_state/formhookreducer';
import * as ACTIONS from '../store/actions/actions';

const HooksForm = () => {

    const [state1, setState1] = useState('')
    const [submit1, setSubmit1] = useState('')
    const [state, dispatch] = useReducer(Reducer.UserHookReducer, Reducer.initState)
    
    const handleStateChange = (event) => {
        setState1(event.target.value)
    }
    
    const handleStateSubmit = (event) => {
        event.preventDefault()
        setSubmit1(event.target.txtSt.value)
    }

    const handleRedStateChange = (event) => {
        dispatch(ACTIONS.user_input_change(event.target.value))
    }
    
    const handleRedStateSubmit = (event) => {
        event.preventDefault()
        dispatch(ACTIONS.user_input_submit(event.target.txtRedSt.value))
    }

    return (
        <div>
            <form onSubmit={handleStateSubmit}>
                <label>React Use State:</label>
                <input id="txtSt" type="text" onChange={handleStateChange} />
                <button type="submit">Submit</button>
            </form>
            <p>
            state1: {state1}
            </p>
            <p>
            submit1:    {submit1}
            </p>
            <form onSubmit={handleRedStateSubmit}>
                <label>React Red Use State:</label>
                <input id="txtRedSt" type="text" onChange={handleRedStateChange} />
                <button type="submit">Submit</button>
            </form>
            <p>
            redstate1: {state.user_text_change}
            </p>
            <p>
            redsubmit1:    {state.user_text_submit}
            </p>
    
        </div>
    )
}

export default HooksForm;