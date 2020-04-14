import React, {Component} from "react"
import ShoppingList from "./ShoppingList"

import itemsData from "../data/itemsData"

// const itemLists = itemsData.map(function(item) {
//     return (<ShoppingList key={item.id} items={{name: item.name, quantity: item.quantity}} />)
// })



class ListItems extends Component {
    constructor() {
        super()

        this.state = {
            itemLists: itemsData
        }
    }

    render() {
        // This is an array of 'ShoppingList' components
        const itemLists = this.state.itemLists.map(item => <ShoppingList key={item.id} items={item} />)

        return (
            <div className="shopList">
                {itemLists}     {/* Replace the individual components with the array of components returned dynamically base don data */}
            </div>
        )
    }
}

export default ListItems