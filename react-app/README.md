## React Basics
### General
:point_right: If we don't 'export default' a functional component, we have to use curly braces when importing the component in other files.
### Styles
- We can use css files in react in multiple ways
    - define it in the index.html (using `link rel='stylesheet'...`)
    - importing it in the react js file directly (`import './test.css';`)
        - Only css files within the 'src/' folder can be imported in these cases. Relative imports outside of 'src/' are not supported. 
    - These can be accessed in the jsx using `className = "style_name"` syntax
- Style variables defined within the js file can have multiple styles separated by commas (instead of semi-colons which are used in a css file)
    - These can be accessed in the jsx using `style = {style_var_name}` syntax
    - If defined in class scope, these do not need to be qualified with a `const` and can be accessed using `this`. Otherwise, these can be defined using the `const` keyword and can be accessed directly (without using `this`)
    ```javascript
    const styles = {   //styles = {...}  (for class scope)
        fontSize: 20,
        backgroundColor: 'grey'
    }
    ```
- Styles can also be defined in a separate js file using the `const` keyword. In this case we need to import the style using the syntax `import * as any_var_name from './style_file_name'` and will need to be accessed in the code as `any_var_name.style_var_name`
- Best practice is to have a separate css file for each component.

### Props and Components
- Props follow one way binding. Child components cannot modify props passed from parents.
- Components are of two types:
    - Functional
        - Set up as arrow functions
        - Returns jsx directly
        - Not state aware
        - Used for display only and are read only
    - Class or Container
        - Uses render function to return jsx
        - State aware
        - Used for scenarios involving user interactions