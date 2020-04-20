import React, {useState, useEffect} from "react"
import randomcolor from "randomcolor"
import StateSampleTwo from "./StateSampleTwo"

// With the useState hook, we don't need to use a constructor to define  a state variable anymore

function StateSample() {
    // Array deconstruction - we can name the deconstructed variables as we like
    //  useState returns two values - a value and a function
    // the function can be used to change state of the variables
    const [ fname, setFname ] = useState("Bob")
    const [ lname, setLname ] = useState("Smith")
    const [ color, setColor ] = useState("")

    function switchNames() {
        setFname(lname)
        setLname(fname)
    }

    // useEffect has a callback function to define the effect
    //  and an array to define the variables to watch for implementing the effect
    //  if the array is left empty, the effect will execute only once on load
    useEffect(() => {
        setColor(randomcolor())
    },[fname])

    // useEffect also provides a return function for performing actions
    //  we would have performed with the lifecycle component componentWillUnmount
    useEffect(() => {
        const intervalId = setInterval(() => {
            setColor(randomcolor())
        },1000)
        return () => clearInterval(intervalId)
    },[])
    
    return (
        <div>
            {/* Use props to pass state value to components */}
            <StateSampleTwo fname={fname}  lname={lname}/>
            <button style={{color: color}} onClick={switchNames}>Switch Names</button>
        </div>
    )    
    
}

export default StateSample