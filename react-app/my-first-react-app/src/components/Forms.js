import React, {Component} from "react"
import FormComponents from "./FormComponents"

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

    handleSubmit(event) {
        event.preventDefault()      // Prevent page from refreshing
        this.setState({
            submitMsg: "The form has been Submitted"
        })
    }
    
    render() {
        return (
            <FormComponents 
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                data={this.state}
            />
        )
    }
}

export default Forms
