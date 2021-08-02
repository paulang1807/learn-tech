import React, { useState, useReducer } from 'react';
import Routes from './routes';
import Context from './utils/context';
import * as Reducer from './store/hooks_state/hookreducer';
import * as UsrReducer from './store/hooks_state/formhookreducer';
import * as ACTIONS from './store/actions/actions';

const App = () => {

  const [globalTest1, setGlobalTest1] = useState(4)
  const [stateContextGlobal, dispatchContextGlobal] = useReducer(Reducer.HookReducer, Reducer.initState)  
  const [stateFormContextGlobal, dispatchFormContextGlobal] = useReducer(UsrReducer.UserHookReducer, UsrReducer.initState)  

  const globalIncrement = () => {
    setGlobalTest1(globalTest1 + 1)
  }

  const handleContextDispatchSuccess = () => {
    dispatchContextGlobal(ACTIONS.success())
  }

  const handleContextDispatchFailure = () => {
    dispatchContextGlobal(ACTIONS.failure())
  }


  const handleFormContextChange = (event) => {
    dispatchFormContextGlobal(ACTIONS.user_input_change(event.target.value))
  }

  const handleFormContextSubmit = (event) => {
    event.preventDefault()
    event.persist()
    dispatchFormContextGlobal(ACTIONS.user_input_submit(event.target.txtRedCtxtSt.value))
  }
  
    return (
      <div>
        React
        <Context.Provider
          value={{
            valGlobTst: globalTest1,
            addGLobTst: () => globalIncrement(),
            valCntxtGlobTst: stateContextGlobal.prop2,
            addCntxtGLobTst: () => handleContextDispatchSuccess(),
            remCntxtGLobTst: () => handleContextDispatchFailure(),
            chgFormCntxtGlobTst: stateFormContextGlobal.user_text_change,
            subFormCntxtGlobTst: stateFormContextGlobal.user_text_submit,
            chgFormCntxtGLobTst: (event) => handleFormContextChange(event),
            subFormCntxtGLobTst: (event) => handleFormContextSubmit(event)
          }}
        >
        <Routes />
        </Context.Provider>
      </div>
    )

  }

export default App;
