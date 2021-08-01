import React, { useState , useEffect } from 'react';

const HooksContainer1 = () => {

    const [test1, setTest1] = useState(2)
    const [test2, setTest2] = useState("Loading...")

    useEffect(() => {
        setTimeout(() => setTest2("Initial Use Effect Change"), 3000)
    }, [test1])

    const calcSquare = () => {
        setTest1(test1 * test1)
    }

    const changeValue = () => {
        setTest2("New use Effect Value")
    }

    return (
      <div>
        Hooks Container1
        <br />
        <button onClick={() => calcSquare()}>Get Square</button>
        <button onClick={() => changeValue()}>Use Effect Test</button>
        <p>Value: {test1}</p>
        <p>Value: {test2}</p>
      </div>
    )

  }

export default HooksContainer1;
