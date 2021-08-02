import React, { Component } from "react"

class EventSample extends Component {
    render() {
        return (
            <div>
                {/* Access class props using this.props */}
                <b>Total Items: </b>{this.props.totalitems}, <b>Shopped: </b>{this.props.shoppeditems}
            </div>
        )
    }
}

export default EventSample