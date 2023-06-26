## Capability APIs
- [Documentation](https://help.qlik.com/en-US/sense-developer/February2019/Subsystems/APIs/Content/Sense_ClientAPIs/capability-apis-reference.htm)
- Entry point to leverage qlik associative engine and application
- **[Root API](https://help.qlik.com/en-US/sense-developer/February2019/Subsystems/APIs/Content/Sense_ClientAPIs/CapabilityAPIs/qlik-interface-interface.htm)**: External interface to qliksense
    - Available as the `qlik` namespace
    - Opens a web socket to the qlik instance
- **[GLobal API](https://help.qlik.com/en-US/sense-developer/February2019/Subsystems/APIs/Content/Sense_ClientAPIs/CapabilityAPIs/qlik-global-interface.htm)**: Entry point to the level above app selection, such as app list, authenticated user, product version etc.
    - `qlik.global` method is the entry point for this api.
- **[App API](https://help.qlik.com/en-US/sense-developer/February2019/Subsystems/APIs/Content/Sense_ClientAPIs/CapabilityAPIs/qlik-app-interface.htm)**:Entry point to methods within a qlik app (create hypercubes, reload app etc.)
    - `qlik.openApp` method is the entry point for this api. 
- **[Field API](https://help.qlik.com/en-US/sense-developer/February2019/Subsystems/APIs/Content/Sense_ClientAPIs/CapabilityAPIs/qlik-field-interface.htm)**: For interacting with qlik fields
- **[Bookmark API](https://help.qlik.com/en-US/sense-developer/February2019/Subsystems/APIs/Content/Sense_ClientAPIs/CapabilityAPIs/qlik-bookmark-interface.htm)**: For working with bookmarks

### Basic Steps
- Load resources using **Require JS**
- Connect to qlik associative engine instance
    - Open App: `qlik.openApp('<app id>', config)`
- Work with qlik app
    - Create a list object (App api): `qlik.app.createList(qListObjectDef, callback)`
    - Get list of qlik objects (App api): `qlik.app.getList(type, callback)`
    - Undo, Redo and Clear (App api): `app.back(), app.forward(), app.clearAll()`
    - Access a field (Field api): `app.field('<field name>')`
    - Select specific values in a field (Field api): `qlik.app.field.selectValues(array, toggle, softlock)`

### Mashups
- **Single Configurator**: Drag and drop wizard in the dev hub to create a mashup in qlik and get a url for embedding the mashup in a web page
    - Does not generate any code. Need to use `Mashup Editor` to generate and edit code for mashups in the dev hub.
- **Mashup Template**: Can be created directly in the dev hub or separately and then copied over to dev hub
    - If creating separately, the folder containing all the mashup files including the html, js, css, qext and wbl can be copied over to ./Documents/Qlik/Sense/Extensions to create a mashup template in the dev hub   
        - `Qext` file contains metadata for the mashup
        - `wbfolder.wbl` file contains list of all files being used in the mashup
    - It is recommended to load the require js from the qlik server when working with mashups
        - The require js on the qlik server is located in `../../resources/assets/external/requirejs/require.js` relative to the mashup template location
        - This location also contains the capability apis and the other files qlik needs to load
        - May need an authentication cookie for the calls to work
    - Creating lists using UI
        - In the mashup editor, select the app using the drop down menu on top left.
        - Click `Lists` on the right had panel and follow the wizard.
        - `Callback function` in the wizard is just a name to access the list created using the wizard.
            - `qDimensionInfo` will contain information on the list dimension
            - `qListObject -> qDataPages -> qMatrix` will have the list data
                - Each item will initially have a `qState` of `O`. When an item is selected, its `qState` changes to `S` and for the non selected items, it changes to `X`

## Other Tips
- Access **Developer Menu**: Type `/options/developer` at the end of the dashboard url.
    - This adds a `Developer Menu` right click option for the objects in the dashboard.
        - Click this option to get the object for the chart.
- Entering `Ctrl + 0 + 0` in the script editor generates dummy data for testing
- To find out the id for the app that created a qvd, open the qvd in a notepad. The app id will be in the `<CreatorDoc>` tag

## Resources
- [Mashup Docs](https://help.qlik.com/en-US/sense-developer/February2019/Subsystems/Mashups/Content/Sense_Mashups/mashups-getting-started.htm)
- [Capability APIs](https://help.qlik.com/en-US/sense-developer/February2019/Subsystems/APIs/Content/Sense_ClientAPIs/capability-apis-reference.htm)
- [List Object](https://help.qlik.com/en-US/sense-developer/February2019/Subsystems/Platform/Content/Sense_PlatformOverview/Concepts/Lists.htm)