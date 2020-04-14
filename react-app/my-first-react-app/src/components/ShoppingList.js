import  React from  "react"

class ShoppingList extends React.Component {
    render() {
        return (
            <div className="shopItem">
                <input type="checkbox" name="items"/>
                <label for="items">{`${this.props.items.name} (${this.props.items.quantity})`}</label><br/>
            </div>
        )

    }
}

export default ShoppingList