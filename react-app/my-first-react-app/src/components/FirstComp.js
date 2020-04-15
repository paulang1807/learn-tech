import React from "react"
import Header from "./Header"
import ListItems from "./ListItems"
import Footer from "./Footer"
import StateSample from "./StateSample"

class FirstComp extends React.Component {
    constructor() {
        super()
        this.state = {
            isLoading: false,
            starWarsData: {}
        }
    }

    componentDidMount() {
        console.log("this is called after render")
        this.setState({isLoading: true})
        // Get data from sample api - not used in this app
        fetch("https://jsonplaceholder.typicode.com/todos/1")
            .then(response => response.json())      // promise
            .then(data => {
                this.setState({
                    isLoading: false,
                    starWarsData: data
                })
            })
    }

    render() {
        console.log("this runs first and then on any state change")
        return (
            <div>
                {this.state.isLoading ?
                <h1>Loading ...</h1> :
                <div>
                    <StateSample />
                    <Header />
                    <ListItems />
                    <Footer />
                </div>
                }
            </div>
        )
    }
}

export default FirstComp