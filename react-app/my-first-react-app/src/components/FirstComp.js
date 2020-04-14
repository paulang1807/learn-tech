import React from "react"
import Header from "./Header"
import ListItems from "./ListItems"
import Footer from "./Footer"
import StateSample from "./StateSample"

class FirstComp extends React.Component {
    render() {
        return (
            <div>
                <StateSample />
                <Header />
                <ListItems />
                <Footer />
            </div>
        )
    }
}

export default FirstComp