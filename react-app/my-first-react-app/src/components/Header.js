import React from "react"

class Header extends React.Component {

    getTimeOfDay() {
        const date = new Date()
        const hours = date.getHours()
        let timeOfDay
    
        // Example of inline styles - used in line 28
        const styles = {
            fontSize: 18    // replace words with dashes using CamelCase
        }
    
        if (hours < 12) {
            timeOfDay = "Morning"
            styles.color = "red"
        } else if (hours > 12 && hours < 17) {
            timeOfDay = "Afternoon"
            styles.color = "blue"
        } else {
            timeOfDay = "Evening"
            styles.color = "green"
        }

        return [timeOfDay, styles]
    }

    render() {
    
        const timeOfDay = this.getTimeOfDay()[0]
        const styles = this.getTimeOfDay()[1]
        
        return (
            <div>
                <header className="navbar">My To-Do List</header>
                {/* In order to insert JS code within html here, use curly braces */}
                <p style={styles}> Good {`${timeOfDay}`}, Here is your To Do list:</p>
            </div>
        )
    }
}

export default Header