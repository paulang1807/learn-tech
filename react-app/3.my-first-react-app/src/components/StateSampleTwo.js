import React from "react"

function StateSampleTwo(props) {
    return (
        <p>Name: {props.fname} {props.lname}</p>
    )
}

/*
The above code can also be written as below using parenthesis instead of curly braces and a return statement
const StateSampleTwo = props => (
    <p>Name: {props.fname} {props.lname}</p>
)
*/

export default StateSampleTwo