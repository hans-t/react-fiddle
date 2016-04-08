# My React guide

## Styling:

The basic principle is, make each CSS selector unique, so there is no cascading.

1. Each component module depends only on it's own CSS file. Use Import to indicate that the CSS file is a dependency. Both should have the same filenames. E.g. button.js has button.css. 
```
# button.js
import 'button.css';
```
2. Prefix CSS selectors with it's filename and dash for namespacing. Selectors need to be in camelCase.
```
#button.css
.button-deleteBtn { ... }
```

3. CSS selectors are used for styling and animation, use inline style for simple adjustment like `margin-top`.

4. If possible, each component should only use one class selector, but can have many pseudo classes to cover many different states of the component.
```
# button.js
class SaveButton extends React.Component {
  render() {
    return <button className='button-saveBtn'>Save</button>;
  }
}

# button.css
button-saveBtn {
  background-color: #999;
}

button-saveBtn:hover {
  background-color: #ddd;
}

```