import React from "react"
import Header from "./Header"
import ListItems from "./ListItems"
import Footer from "./Footer"
import StateSample from "./StateSample"

class FirstComp extends React.Component {
    constructor() {
        super()
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        console.log("this is called after render")
        setTimeout(() => {
            this.setState({isLoading: false})
        }, 1500)
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