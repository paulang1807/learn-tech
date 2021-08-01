import React, { useState } from 'react';
import Routes from './routes';
import Context from './utils/context';

const App = () => {

  const [globalTest1, setGlobalTest1] = useState(4)

  const globalIncrement = () => {
    setGlobalTest1(globalTest1 + 1)
}
    return (
      <div>
        React
        <Context.Provider
          value={{
            valGlobTst: globalTest1,
            addGLobTst: () => globalIncrement()
          }}
        >
        <Routes />
        </Context.Provider>
      </div>
    )

  }

export default App;
