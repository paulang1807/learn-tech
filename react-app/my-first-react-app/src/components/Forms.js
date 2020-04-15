import React, {Component} from "react"

class Forms extends Component {
    constructor() {
        super()
        this.state = {
            txtVal: "",
            txtArVal: "",
            inpChk: false,
            chooseOptn: "yes",
            selAnimal: "tiger",
            submitMsg: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleChange(event) {
        // Best practice - extract what you need from event beforehand
        const {name, value, type, checked} = event.target
        type === 'checkbox' ? this.setState({[name]: checked}) :
        this.setState({
            // Get name of the form component dynamically
            // and assign it the value
            [name]: value
        })
    }

    handleSubmit() {
        this.setState({
            submitMsg: "The form has been Submitted"
        })
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {/* Input Box */}
                <input 
                    type="text" 
                    value={this.state.txtVal}   // control form concept - drive value based on state
                    name="txtVal" 
                    placeholder="Text Here" 
                    onChange={this.handleChange} 
                />
                <p>{this.state.txtVal}</p>
                {/* textarea - self closing tag in react unlike html*/}
                <textarea value={this.state.txtArVal} name="txtArVal" onChange={this.handleChange}/>
                <p>{this.state.txtArVal}</p>
                {/* checkbox */}
                <label>
                    <input type="checkbox" name="inpChk" checked={this.state.inpChk} onChange={this.handleChange}/> Okay?
                </label>
                <p>Checked: {this.state.inpChk ? 'Yes' : 'No'}</p>
                {/* radio button */}
                <label>
                <input type="radio" name="chooseOptn" value="yes" checked={this.state.chooseOptn === "yes"} onChange={this.handleChange} /> Yes
                </label>
                <label>
                <input type="radio" name="chooseOptn" value="no" checked={this.state.chooseOptn === "no"} onChange={this.handleChange} /> No
                </label>
                <p>Chosen Option: {this.state.chooseOptn}</p>
                {/* select - dropdown */}
                <label>Select Animal:</label>
                <select name="selAnimal" value={this.state.selAnimal} onChange={this.handleChange}>
                    <option value="tiger">Tiger</option>
                    <option value="lion">Lion</option>
                    <option value="leopard">Leopard</option>
                    <option value="jaguar">Jaguar</option>
                </select>
                <p>Selected Animal: {this.state.selAnimal}</p>
                {/* button */}
                <button>Submit</button>
                <p>{this.state.submitMsg}</p>
            </form>
        )
    }
}

export default Forms
