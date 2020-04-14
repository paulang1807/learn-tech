import React, {Component} from "react"
import StateSampleTwo from "./StateSampleTwo"

class StateSample extends Component {
    constructor() {
        super()
        this.state = {
            fname: "Bob",
            lname: "Smith"
        }
    }
    
    render() {
        return (
            <div>
                {/* Use props to pass state value to components */}
                <StateSampleTwo fname={this.state.fname} lname={this.state.lname} />
            </div>
        )    
    }
}

export default StateSample