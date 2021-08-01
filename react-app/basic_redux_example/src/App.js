import React, { useState, useReducer } from 'react';
import Routes from './routes';
import Context from './utils/context';
import * as Reducer from './store/hooks_state/hookreducer';
import * as ACTIONS from './store/actions/actions';

const App = () => {

  const [globalTest1, setGlobalTest1] = useState(4)
  const [stateContextGlobal, dispatchContextGlobal] = useReducer(Reducer.HookReducer, Reducer.initState)  

  const globalIncrement = () => {
    setGlobalTest1(globalTest1 + 1)
  }

  const handleContextDispatchSuccess = () => {
    dispatchContextGlobal(ACTIONS.success())
  }

  const handleContextDispatchFailure = () => {
    dispatchContextGlobal(ACTIONS.failure())
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
            remCntxtGLobTst: () => handleContextDispatchFailure()
          }}
        >
        <Routes />
        </Context.Provider>
      </div>
    )

  }

export default App;
