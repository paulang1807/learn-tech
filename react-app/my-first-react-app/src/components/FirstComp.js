import React from "react"
import Header from "./Header"
import ListItems from "./ListItems"
import Footer from "./Footer"

class FirstComp extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <ListItems />
                <Footer />
            </div>
        )
    }
}

export default FirstComp