import React, { useState , useEffect, useReducer, useContext } from 'react';
import * as Reducer from '../store/hooks_state/hookreducer';
import * as ACTIONS from '../store/actions/actions';
import Context from '../utils/context';

const HooksContainer1 = () => {

    const context = useContext(Context);

    const [test1, setTest1] = useState(2)
    const [test2, setTest2] = useState("Loading...")
    const [state1, dispatch1] = useReducer(Reducer.HookReducer, Reducer.initState)  
    // Here we are using state1 and dispatch1 for the state and dispatch properties but it is best practice to just use state and dispatch

    useEffect(() => {
        setTimeout(() => setTest2("Initial Use Effect Change"), 3000)
    }, [test1])

    const calcSquare = () => {
        setTest1(test1 * test1)
    }

    const changeValue = () => {
        setTest2("New use Effect Value")
    }

    const handleDispatchSuccess = () => {
        dispatch1(ACTIONS.success())
        // We  can also dispatch in the following ways:
        // dispatch1(ACTIONS.SUCCESS)
        // dispatch1(type: "SUCCESS")
    }

    const handleDispatchFailure = () => {
        dispatch1(ACTIONS.failure())
    }

    return (
      <div>
        Hooks Container1
        <br />
        <button onClick={() => calcSquare()}>Get Square</button>
        <button onClick={() => changeValue()}>Use Effect Test</button>
        <button onClick={() => handleDispatchSuccess()}>Dispatch Success</button>
        <button onClick={() => handleDispatchFailure()}>Dispatch Failure</button>
        <button onClick={() => context.addGLobTst()}>Incr Global Context</button>
        <button onClick={() => context.addCntxtGLobTst()}>Incr Global Context Red</button>
        <button onClick={() => context.remCntxtGLobTst()}>Decr Global Context Red</button>
        <p>Value: {test1}</p>
        <p>Value: {test2}</p>
        <p>{state1.prop1}</p>
        <p>{context.valGlobTst}</p>
        <p>{context.valCntxtGlobTst}</p>
            <p>
            ctxtredstate1: {context.chgFormCntxtGlobTst}
            </p>
            <p>
            ctxtredsubmit1:    {context.subFormCntxtGlobTst}
            </p>
      </div>
    )

  }

export default HooksContainer1;
