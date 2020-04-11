import React from "react"

function ListItems() {
    return (
        <div>
            <input type="checkbox" id="item1" name="item1" value="item1" />
            <label for="item1">Item 1</label><br/>
            <input type="checkbox" id="item2" name="item2" value="item2" />
            <label for="item2">Item 2</label><br/>
        </div>
    )
}

export default ListItems