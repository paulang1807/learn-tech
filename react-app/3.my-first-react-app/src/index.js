import React from "react"
import ReactDOM from "react-dom"
import FirstComp from "./components/FirstComp"  // Default file extension is .js so we don't need to specify it in the import statement


// ReactDOM.render(what, where)
ReactDOM.render(<FirstComp />, document.getElementById("root"))