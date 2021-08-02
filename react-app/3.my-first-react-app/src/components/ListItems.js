import React, {Component} from "react"
import ShoppingList from "./ShoppingList"

import itemsData from "../data/itemsData"
import EventSample from "./EventSample"
class ListItems extends Component {
    // With new changes in react, we dont need a constructor for defining state objects
    // Also we no longer need to bind methods inside a constructor if we use arrow functions
    // Example: updateItems and getShopped methods below
    
    state = {
        itemLists: itemsData,
        shoppedItems: 0
    }

    updateItems = (id) => {
        this.setState(prevState => {
            const updatedItems = prevState.itemLists.map(itm => {
                if (itm.id === id) {
                    return {
                        ...itm,
                        checked: !itm.checked
                    }
                    // itm.checked = !itm.checked
                }
                return itm
            })
            const itmsShopped = this.getShopped(updatedItems)
            return {
                itemLists: updatedItems,
                shoppedItems: itmsShopped.length
            }
        })
    }

    filterByChecked(item) {
        if (item.checked) {
          return true
        } 
        return false;
      }

    getShopped = (shoppeditems) => {
        let itmsShopped = shoppeditems.filter(this.filterByChecked)
        return itmsShopped
    }

    render() {
        // This is an array of 'ShoppingList' components
        // Pass methods to child components to identify the data elements being impacted by changes in the child elements.
        const itemLists = this.state.itemLists.map(item => <ShoppingList key={item.id} items={item} updateItems={this.updateItems}/>)

        return (
            <div className="shopList">
                {itemLists}     {/* Replace the individual components with the array of components returned dynamically base don data */}
                <EventSample totalitems={this.state.itemLists.length} shoppeditems={this.state.shoppedItems}/>
            </div>
        )
    }
}

export default ListItems