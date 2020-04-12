import React from "react"
import ShoppingList from "./ShoppingList"

function ListItems() {
    return (
        <div className="shopList">
            <ShoppingList 
                items={{name: "Item 1", quantity: 2}}
            />
            <ShoppingList
                items={{name: "Item 2", quantity: 1}}
            />
            <ShoppingList
                items={{name: "Item 3", quantity: 5}}
            />
        </div>
    )
}

export default ListItems