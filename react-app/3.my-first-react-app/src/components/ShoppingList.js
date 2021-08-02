import  React from  "react"

class ShoppingList extends React.Component {
    constructor() {
        super()
        this.state = {
            color: "blue"
        }
        // Bind methods that are involved in state changes.
        this.handleHover = this.handleHover.bind(this)
        this.handleMouseOut = this.handleMouseOut.bind(this)
    }

    // Change state with setState directly without accounting for previous state
    handleHover() {
        this.setState({color: "red"})
    }

    handleMouseOut() {
        this.setState({color: "blue"})
    }

    render() {
        const styles = {
            color: this.state.color
        }

        return (
            <div className="shopItem">
                {/* Event calls using methods passed from parent */}
                <input type="checkbox" name="items" checked={this.props.items.checked} onChange={() => this.props.updateItems(this.props.items.id)}/>
                {/* Event calls using this.method in curly braces */}
                <label for="items" style={styles} onMouseOver={this.handleHover} onMouseOut={this.handleMouseOut}>{`${this.props.items.name} (${this.props.items.quantity})`}</label><br/>
            </div>
        )

    }
}

export default ShoppingList