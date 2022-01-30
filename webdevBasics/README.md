# NPM and Node Basics
- `npm install --global library-name` : To install a library globally
- `npm install --save library-name` : To install a library locally in the current project folder
- `node <filename.js>` : To run a program
## JS Basics
- **Callback Function**: Functions that is passed as an argument to another function
- **Higher Order Functions**: Functions that accept another function as argument or return a function
- JS `arrays` are similar to python `lists` and js `objects` are similar to python `dicts`.
    - We can use the `.map` method to loop through the array elements. We can pass two parameters (item and index) to the method. This is similar to enumerate in python (which returns the actual object and the corresponding index):
    ```javascript
    Arr.map((item, index) => ...)
    ```
- As a best practice, the names of constructor functions start with a capital letter. 
- We usually put the js tag at the bottom of the html page so that all the html elements are available for the code to act on.
- We can change the scope of a local variable to have a global scope by associating it to the window object: `window.localVar = localVar`

## CSS Basics
- Use [bootstrap components](https://getbootstrap.com/docs/4.5/components) for pre styled objects.
- Use `inherit` to force styles in child elements to be inherited from the parents
    ```
    .test {
        color: inherit;
    }
    ```
- **CSS Variables**: Can be `Global` or `Local`. Defined with a `--` prefix
    - Global variables are defined inside the `:root` selector. The `:root` selector matches the document's root element.
        ```
        :root {
        --blue: #1e90ff;
        }
        ```
    - To create a variable with local scope, declare it inside the selector that is going to use it.
        ```
        body { background-color: var(--blue); }
        ```
- **Specificity**: https://specificity.keegan.st/
    - Element Selectors -> Class Selectors -> ID Selectors -> Inline Style -> !Important
- **Box Model**: 
    - Padding  is the space between the element and its border.
    - Margin is the space between two elements.
- Using `rem` for specifying font size results in sizing the fonts relative other elements in the html
- Responsive Design: Use [Media Queries](https://www.w3schools.com/css/css_rwd_mediaqueries.asp)
- Tooltips: Sample using [bootstrap](https://getbootstrap.com/docs/4.5/components/tooltips/)
- Applying same style class to parent and child tags:
```css
    parentTag.className childTag1,
    parentTag.className childTag2 {
        css statements...
    }
```

### Positioning
- https://www.w3schools.com/css/css_positioning.asp
- Default positioning of elements in HTML is vertical stacking, i.e. anchored one below the other.
    - Position property can be used to specify variations from the default positioning.
        - `Relative` sets the position relative to the default position based on the top, bottom, left and right attributes.
        - `Absolute` sets the position relative to the nearest parent.
- One of the ways to position the elements horizontally is by using the `inline-block` property.
    - This may result in the introduction of a small gap between the elements. Use `font-size:0` to get rid of this gap.

### Flex Box
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox
- A better way to arrange the elements horizontally is to use the `display: flex` property in the parent.
    - Setting the `flex-direction: column` will switch the positioning back to vertical.
- Justification settings in the parent: `justify-content: flex-start`, `justify-content: flex-end`, `justify-content: space-between`
- Normally if the display is set to flex in the parent object, the child objects will adjust height and width based on the parent container. Specify align properties in the parent to maintain original dimensions
    - `align-items: flex-start`, `align-items: center`
- Specifying `margin: auto` for the child elements is a good way to control their positioning.
- Use relevent `flex-wrap: wrap` property in the parent to wrap the child elements to the next row or column.
- In order to divide the screen proportionately, for example into a left 'sidebar' section and a right 'content' section, we can use the `flex` attribute:
    - For example, to divide the page in 1:3 ratio, the following css can be used: 
        ```
        .left-section {
            flex: 1;
        }
        .right-section {
            flex: 3;
        }
        ```

## DOM Basics
- Query elements in a document: 
    - Using query selector: `document.querySelectorAll("<.classname>")`, `document.querySelectorAll("<#id>")` etc.
        - Returns an array of the objects with the class or id
    - Using get methods
        - for classes, use `document.getElementsByClassName("<classname>")` (specify class name without . unlike query selector)
        - for ids, use `document.getElementsById("<id>")`
- Access and change different styles in the document: `.style.<style_to_access_or_change>` 
    - Use camel case for hyphen separated styles: 
        - For example, to change background-color, use `style.backgroundColor`
- Add html content to existing DOM elements using `innerHTML`

## JQuery Basics
- Syntax: `$(selector).action()` where selector are the HTML elements where we want to perform the actions
    - Example: `$(<tagname> or <.classname> or <#id>).hide()`
    - To change css directly: `$(<tagname> or <.classname> or <#id>).css(property, value)`
        - Use dictionary format to specify multiple properties and values `$(div).css({property1: value1,property2: value2})`
    - To apply style from a css file: `$(<tagname> or <.classname> or <#id>).addClass(<style from css file>)`
    - To add innerHTML: `$(<tagname> or <.classname> or <#id>).html(<html to add>)`
    - To append (content including innerHTML) to any html element: `$(<tagname> or <.classname> or <#id>).append(<html to add>)`
    - To empty out content: `$(<tagname> or <.classname> or <#id>).empty()`
    - To access different properties: `$(<tagname> or <.classname> or <#id>).prop(<propertyName>, <value>)`
    - To add event listeners, we can just use the event to add the listener 
        - E.g., for click events`$(<tagname> or <.classname> or <#id>).click(<function>)`
        - Use `toggleClass` method to add and toggle classes: `$(<tagname> or <.classname> or <#id>).toggleClass(<class_name>)`
            - If the class is already attached to the html element, use `toggle`: `$(<.classname>).toggle()`
                - Separate class names by space if multiple classes need to be referenced: `toggle`: `$(<.classname1 classname2>).toggle()`
- Document Ready function: Waits for the document to be ready before executing functions. This will allow us the add the js tag to the header of the html code since the function will be used to wait for the document to load.
    ```
    $(document).ready(function() {
        <code to execute once document is ready>
    });
    ```
    OR
    ```
    $(function(){
        <code to execute document is ready>
    });
    ```
- Loop through data elements: `$.each(<dataElement>, function(key, value){...})`
- Custom attributes need to be referred using square brackets: `$('[data-<attr>]').click()`
    - Access these attributes using `$(this).data("<attr>")`            

## Require JS
- Used for management of modular code
    - Helps avoid having to add the script tag for each and every js file required.
- All code is loaded relative to a base url: `<script data-main="<main js file>" src="<base url>"></script>`
    - E.g. `<script data-main="./scripts/main.js" src=".scripts/require.js"></script>` where main.js is the entry point for the project.
    - JS dependencies can be managed in the main js file using the `require` keyword.
        ```
        require(['file1','library1']),function(){
            <some code>
        };
        ```
        - When using jquery as a dependency, we may can pass the `$` object as a parameter to the function
            - If other dependencies are specified, we will need to specify parameters for all preceding dependencies as well.
        ```
        require(['library1']),function($){
            <some jquery code>
        };
        ```
    - Use a configuration setting in the main js file to define dependencies
        - Define a base url in the config to specify the location against which all the dependency files are loaded.
        - Define paths to specify a ref and name of the dependency file
        ```
        require.config({
            baseUrl: 'lib',
            paths: {
                refName: 'dependencyFile'
            }
        })
        ```
        - We can mention the CDNs for the required js files and also include a downloaded version of the minified code to be used in offline mode( when the cdn url cannot be accessed). 
            - In this case, we need to mention the CDN url as well as the path to the downloaded file in the paths parameter of the config section
            ```
            require.config({
                baseUrl: 'lib',
                paths: {
                    refName: ['<CDN url>','dependencyFile']
                }
            })
            ```
            - DO NOT mention the .js suffix even for the CDN url
            - We can use the `Network` section of the browser to test out the differences in the load time for CDN as opposed to the downloaded file
        - Use **shim config** to manage dependencies of dependencies for scripts that don't support AMD (asynchronous modules)
            ```
            require.config({
                baseUrl: 'lib',
                paths: {
                    refName1: ['<refName1 CDN url>','dependencyFile1'],
                    refName2: ['<refName2 CDN url>'[,'dependencyFile']]
                },
                shim: {
                    'refName2': {
                        deps: ['refName1']
                    }
                }
            })
            ```
        - Multiple configurations can also be used by specifying a `context` and using the context (in curly braces) in the require specification
            ```
            // Config with context
            require.config({
                context: '<contextName1>',
                ...
            })

            // Base Config
            require.config({
                path: '<pathValue>'
            })

            // require specification for base config
            require(['<base library>'],function(){
                //require specification for context based config
                require({context: '<contextName1>'},['<library1>'])
            })
            ```
- **Define Function**: 
    - https://requirejs.org/docs/api.html#define
    - Define a module that will be used by other parts of the application


## Useful Resources
- [VSCode html extension cheat sheet](https://docs.emmet.io/cheat-sheet/)
- [Unicode characters](https://unicode-table.com/en/)
- [Bootstrap](https://getbootstrap.com/)
- [BootstrapSelect](https://developer.snapappointments.com/bootstrap-select/)
- [Google fonts](https://fonts.google.com/)
- [Font awesome](https://fontawesome.com)
- [Free Images](https://unsplash.com/)
- [Semantic UI](https://semantic-ui.com/)
- [Minify js and css code](https://www.minifier.org/)
- [Media Queries](https://www.w3schools.com/css/css_rwd_mediaqueries.asp)
- [Structured CSS](https://www.code-boost.com/beginners-guide-to-scss/)
- [Require js](https://requirejs.org/)
- [Custom Attributes](https://www.w3schools.com/tags/att_global_data.asp)
- [Lodash](https://lodash.com/)
- [Numeral JS](http://numeraljs.com/)
- [Tippy](https://atomiks.github.io/tippyjs/)

### Resources for Design
- https://dribbble.com
- https://color.adobe.com/explore/?filter=most-popular&time=month
- https://uigradients.com/#TheStrain