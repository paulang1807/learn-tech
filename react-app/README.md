## React Basics
### General
:point_right: If we don't 'export default' a functional component, we have to use curly braces when importing the component in other files.
- All components should be in uppercase
- Adjacent jsx elements must be enclosed in a tag
- In legacy codes, if arrow functions are not used, we need to bind the functions to `this` using `this.<function_name> = this.<function_name>.bind(this)`. The above is done inside the constructor (the constructor also needs to have the `super(props)` method). Otherwise we will get an error.
- **Higher Order Component: Component that takes a component and returns another component.
- Parenthesis are used to pass parameters in functions and curly braces are used to indicate the scope of something (https://www.akashmittal.com/expected-assignment-no-unused-expressions/)
- https://stackoverflow.com/questions/48150567/react-router-difference-between-component-and-render
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
- :exclamation: When using props in class components, we need to use the keyword `this` before `props` whereas props in functional components can be accessed directly just using   `props`
- When passing a list as a prop to a component we need to specify a unique key using the `key` keyword.

### Forms
- We usually handle the change and submit events for forms using methods called `handleChange` and `handleSubmit` (although these can be named anything else as well) respectively.
- The data in the forms is accessed using the `event` (keyword) parameter that is passed to the above methods.  
    - Some commonly used properties of the `event` are `name, value, type, checked` etc.  
        - We use `event.target.value` to access the value in the `handleChange` method whereas we use `event.target.<element_id>.value` to access the value in the `handleSubmit` method. Here `element_id` is the value assigned to the id attribute of the element.
    - We can use `event.preventDefault()` to prevent the browser from submitting every time the form is submitted.

### Router and History
- Install
    - `npm install react-router`
    - `npm install react-router-dom`
    - `npm install react-history`
- If a part of one route path matches the complete path for some other route ( E.g., path1='/home/comp1' and path2='/home'), trying to access the first route (path1) will result in including the content from the second route (path2) as well.
    - This can be avoided by importing `Switch` from `react-router` and including the keyword  `exact` in the route specification of the smaller path ( `<Route exact path="/home" component={component_name}/>`) 
## Redux
- Install
    - `npm install redux`
    - `npm install react-redux`
- State management library to update and persist state across all components ( to get over the one way binding limitation of props)
- Has two main parts: Actions and Reducers
    - Reducers have switch-case statements corresponding to each Action. 
- Only class based react components are aware of the redux state
- Action Creators are functions that return actions

## React, Redux and React-Redux
- Update state
    - React: this.setState()
    - Redux: store.dispatch()
    - React-Redux: mapDispatchToProps(), this.props.dispatch_action()
        - `mapDispatchToProps` modifies the state globally and allows to use the state globally in the app
- Read State
    - React: this.state.<property_name>
    - Redux: store.getState()
    - React-Redux - matchStateToProps(), this.props.<property_name>
        - `matchStateToProps` is only applicable to the component it is used in
- `connect()` is used to connect the react container to the redux store
    - For Read and Actions containers, use `connect(matchStateToProps, mapDispatchToProps)(Container1)`
        - The StateToProps parameter should be passed as the first parameter and the DispatchToProps should be passed as the second parameter
    - For Read only containers, use `connect(matchStateToProps)(Container1)`
    - For Actions only containers, use `connect(null, mapDispatchToProps)(Container1)`
        - Since the StateToProps parameter is not needed here, we have to pass a null as the first parameter in its place

## Authentication
- Installs
    - `npm install auth0-js`
## Useful Links
- [Auth0](https://manage.auth0.com/dashboard/us/)
- [JWT](https://jwt.io/)