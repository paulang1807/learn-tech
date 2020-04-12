import  React from  "react"

function ShoppingList(props) {
    return (
        <div className="shopItem">
            <input type="checkbox" name="items"/>
            <label for="items">{`${props.items.name} (${props.items.quantity})`}</label><br/>
        </div>
    )
}

export default ShoppingList