import React, { useState, useReducer, useContext } from 'react';

const HooksForm = () => {

    const [state1, setState1] = useState('')
    const [submit1, setSubmit1] = useState('')
    
    const handleStateChange = (event) => {
        setState1(event.target.value)
    }
    
    const handleStateSubmit = (event) => {
        event.preventDefault()
        setSubmit1(event.target.txtSt.value)
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
    
        </div>
    )
}

export default HooksForm;