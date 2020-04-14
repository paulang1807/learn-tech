import React from "react"

function clickFunction() {
    alert("Button Clicked!")
}

function EventSample() {
    return (
        <div>
            <button onClick={clickFunction}>Click Here</button>
            <button onMouseOver={() => alert("Mouseover Action!")}>Hover Here</button>
        </div>
    )
}

export default EventSample