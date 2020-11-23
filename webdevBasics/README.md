## General
- **Callback Function**: Functions that accept another function as an argument

## CSS Basics
- Use [bootstrap components](https://getbootstrap.com/docs/4.5/components) for pre styled objects.

### Specificity
- https://specificity.keegan.st/
- Element Selectors -> Class Selectors -> ID Selectors -> Inline Style -> !Important

### Box Model
- Padding  is the space between the element and its border.
- Margin is the space between two elements.

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

### Fonts
- Using `rem` for specifying size results in sizing the fonts relative other elements in the html

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

## Useful Resources
- VSCode html extension cheat sheet: https://docs.emmet.io/cheat-sheet/
- Unicode characters: https://unicode-table.com/en/
- Google fonts: https://fonts.google.com/
- Font awesome: https://fontawesome.com
- Free Images: https://unsplash.com/