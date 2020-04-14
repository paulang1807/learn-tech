import React, {Component} from "react"

class App extends Component {
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
                <h1>{this.state.fname}</h1>
                <h3>{this.state.lname}</h3>

                {/* Use props to pass state value to components */}
                <TestComp fname={this.state.fname} />
            </div>
        )    
    }
}

export default App