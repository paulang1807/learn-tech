import React from "react"

function FormComponents(props) {
    return (
        <form onSubmit={props.handleSubmit}>
            {/* Input Box */}
            <input 
                type="text" 
                value={props.data.txtVal}   // control form concept - drive value based on state
                name="txtVal" 
                placeholder="Text Here" 
                onChange={props.handleChange} 
            />
            <p>{props.data.txtVal}</p>
            {/* textarea - self closing tag in react unlike html*/}
            <textarea value={props.data.txtArVal} name="txtArVal" onChange={props.handleChange}/>
            <p>{props.data.txtArVal}</p>
            {/* checkbox */}
            <label>
                <input type="checkbox" name="inpChk" checked={props.data.inpChk} onChange={props.handleChange}/> Okay?
            </label>
            <p>Checked: {props.data.inpChk ? 'Yes' : 'No'}</p>
            {/* radio button */}
            <label>
            <input type="radio" name="chooseOptn" value="yes" checked={props.data.chooseOptn === "yes"} onChange={props.handleChange} /> Yes
            </label>
            <label>
            <input type="radio" name="chooseOptn" value="no" checked={props.data.chooseOptn === "no"} onChange={props.handleChange} /> No
            </label>
            <p>Chosen Option: {props.data.chooseOptn}</p>
            {/* select - dropdown */}
            <label>Select Animal:</label>
            <select name="selAnimal" value={props.data.selAnimal} onChange={props.handleChange}>
                <option value="tiger">Tiger</option>
                <option value="lion">Lion</option>
                <option value="leopard">Leopard</option>
                <option value="jaguar">Jaguar</option>
            </select>
            <p>Selected Animal: {props.data.selAnimal}</p>
            {/* button */}
            <button>Submit</button>
            <p>{props.data.submitMsg}</p>
        </form>
    )
}

export default FormComponents
