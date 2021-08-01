import React, { useState } from 'react';

const HooksContainer1 = () => {

    const [test1, setTest1] = useState(2)

    const calcSquare = () => {
        setTest1(test1 * test1)
    }

    return (
      <div>
        Hooks Container1
        <br />
        <button onClick={() => calcSquare()}>Get Square</button>
        <p>Value: {test1}</p>
      </div>
    )

  }

export default HooksContainer1;
