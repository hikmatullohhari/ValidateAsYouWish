
# ValidateAsYouWish

![version-1.0.0](https://img.shields.io/badge/version-1.0.0-blue.svg?style=flat)
![dependencies-jquery](https://img.shields.io/badge/dependencies-jquery-brightgreen.svg?style=flat)

##### A simple js validator to validate DOM element.
##### A #JustForFun(c) code created in my free time. I know there are many validator libraries out there, but code on my own is satisfying my learning desire.

#### This consist of 
> - ValidateAsYouWish.js
> - ValidateAsYouWish.css

#### Basic Usage

```html
<link rel="stylesheet" href="ValidateAsYouWish/ValidateAsYouWish.css">
<div id="form-id">
    <div class="form-group">
        <label>Full Name</label>
        <input class="form-control" type="text" name="fullname" required>
    </div>
    <div class="form-group">
        <label>Email</label>
        <input class="form-control" type="email" name="email" required>                            
    </div>
    <div class="form-group">
        <label>Address</label>
        <input class="form-control" type="text" name="address" required>
    </div>
</div>
<script src="ValidateAsYouWish/ValidateAsYouWish.js"></script>
```

```javascript
var validator = $("#form-id").validator();
if(validator.validate()){ // evaluate result, print to DOM if invalid
    /* valid to submit */
}

/* [optional] manually get errors */
validator.errors();
```

#### Basic Usage Result Example
![example1](https://github.com/hikmatullohhari/ValidateAsYouWish/blob/master/screenshot/basic1.jpg)
![example1](https://github.com/hikmatullohhari/ValidateAsYouWish/blob/master/screenshot/basic2.jpg)

#### Custom using HTML
> #1. override default message
```html
...
<div id="form-id">
    <div class="form-group">
        ...
        <input name="fullname" vayw-message="This is required" required>
    </div>
    ...
</div>
...
```

> #2. override + move span.invalid into another container
```html
...
<div id="form-id">
    <div class="form-group">
        ...
        <input name="fullname" vayw-message="This is required" required>
    </div>
    <span class="vayw-message vayw-invalid" for="fullname">
    ...
</div>
...
```
#### Custom using parameters
> #1. override default message
```html
...
<div id="form-id">
    <div class="form-group">
        ...
        <input name="fullname" required>
    </div>
    ...
</div>
...
```

```javascript
var validator = $("#form-id").validator({
    ...
    message: {
        required: "custom message for required from parameters"
    },
    ...
});
```

> #2. override template
```html
...
<div id="form-id">
    <div class="form-group">
        <input name="fullname" required>
    </div>
    <div vayw-template for"fullname"></div>
    ...
</div>
...
```
```javascript
var validator = $("#form-id").validator({
    ...
    template: {
        required: "<div class='some-class'>"+
                        "<div class='another-div'>"+
                            "{%message}"+
                        "</div>"+
                    "</div>"
    }
    ...
});
```

> #3. create new rules
```html
...
<div id="form-id">
    <div class="form-group">
        <input name="fullname" new_rule another_rule required>
    </div>
    ...
</div>
...
```

```javascript
var validator = $("#form-id").validator({
    ...
    rules: {
        new_rule: function(e){ // e for element
            /* your logic here
             * return bool
             */ 

            /* example
             * if($(e).attr("some-attribute") == "do not validate"){
             *      return true;
             * }
             * return false;
             */
        },
        another_rule: function(e){
            /* * */
        },
    }
    ...
});
```
> #4. Validate other rules except required
```javascript
var validator = $("#form-id").validator({
    rules: {
        required: function(e){
            return true;
        },
        other_rule: function(e){
            /* * */
        }
        ..
    },
    ...
});
```
> #5. Combined multiple parameter
```javascript
var validator = $("#form-id").validator({
    rules: {
        new_rule: function(e){
            /* * */
        },
        ...
    },
    message: "new_rule message using parameters",
    template: "<div class='custom-using-parameters'>{%message}</div>"
});
```