/* author Hikmatulloh Hari Mukti */
(function($){
    const SHOULD_RETURN_BOOLEAN = "[error] invalid rules.{%v} function declaration: should return boolean.",
          REQUIRED_MESSAGE = "{%name} is required",
          INVALID_EMAIL_MESSAGE = "{%name} is an invalid email address",
          DEFAULT_TEMPLATE = "<span class='vayw-message vayw-invalid' for='{%for}'><i class='fa fa-warning'></i> {%v}</span>";

    var _errors = [],
        _context,
        _parameters;
    
    /* parameters will overrides inline-html-declaration will overrides default */
    $.fn.validator = function(parameters){
        _parameters = parameters; _context = this.selector; return $.fn.validator;
    }

    $.fn.validator.errors = function(){
        return _errors;
    }

    $.fn.validator.validate = function(){
        var p = _parameters;
        p = (p == undefined) ? [] : p;
        p.rules = (p.rules == undefined) ? [] : p.rules;
        var r = p.rules;
        r.required = (r.required == undefined) ? function(element) {
            var isValid = true,
                type = $(element).attr("type")
                value = $(element).val();
    
            if(type == "checkbox" || type == "radio"){
                checkboxElement = $(element).find("[name="+name+"][type=checkbox]");
                isValid = checkboxElement.is(":checked");
            } else if(type == "email"){
                isValid = value != "";
                if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) == false){
                    isValid = false;
                }
            } else {
                isValid = value != "";
            }
            return isValid
        } : r.required;
        _parameters = p;
        _errors = [];

        var isValid = true;
        var elements = $(_context).find(":input");
        for(var element of elements){
            var isElementValid = true,
                message = "",
                name = $(element).attr("name");

            for(var key in p.rules){
                if($(element).attr(key) != undefined){
                    isElementValid = p.rules[key](element);
                    message = _getMessage(element);
                    if(typeof isElementValid != "boolean"){
                        isElementValid = false;
                        message = SHOULD_RETURN_BOOLEAN.replace("{%v}", key);
                    }
                    isValid = isValid && isElementValid;
                    break;
                }
            }

            if(isElementValid == false) {
                _appendTemplate(element, message);
            } else {
                $("[vayw-template]").replaceWith("<div vayw-template for="+name+" style='display: none'></div>");
                $(element).parent().find("[for="+name+"].vayw-message").removeClass("vayw-invalid");
            }
        }

        return isValid;
    }

    var _getMessage = function(element){
        var message = "",
            isMessageDeclared = false,
            name = $(element).attr("name");

        if(_parameters != undefined && _parameters.messages !=undefined){
            for(var key in _parameters.messages){
                if($(element).attr(key) != undefined){
                    isMessageDeclared = true;
                    message = _parameters.messages[key].replace("{%name}", name);
                    break;
                }
            }
        }

        if(isMessageDeclared == false) {
            if($(element).attr("vayw-message") != undefined){
                message = $(element).attr("vayw-message");
            } else {
                message = REQUIRED_MESSAGE.replace("{%name}", name);
                if($(element).attr("type") == "email" && $(element).val() != ""){
                    message = INVALID_EMAIL_MESSAGE.replace("{%name}", name);
                }
            }
        }
        return message
    }

    var _appendTemplate = function(element, message){
        var name = $(element).attr("name"),
            type = ($(element).attr("type") == undefined) ? undefined : $(element).attr("type").toLowerCase(),
            elementSiblings = $(element).parent().find("[name="+name+"][type="+type+"]"),
            elementToAfter = (elementSiblings.length > 0) ? element : elementSiblings.get(0),
            template = DEFAULT_TEMPLATE.replace("{%for}", name).replace("{%v}", message),
            isTemplateDeclared = false;

        if(_parameters != undefined && _parameters.templates != undefined){
            for(var key in _parameters.templates){
                if($(element).attr(key) != undefined){
                    isTemplateDeclared = true;
                    var templateContainer = $(_context).find("[for="+name+"][vayw-template]");
                    template = $(_parameters.templates[key].replace("{%message}", message)).attr({
                        "vayw-template": ""
                    });
                    if(templateContainer.length > 0){
                        $(templateContainer).replaceWith(template); //append
                    } else {
                        $(elementToAfter).after(template); //append
                    }
                    break;
                }
            }
        }
        
        if(isTemplateDeclared == false){
            var v_element = $(_context).find("[for="+name+"].vayw-message");
            if(v_element.length == 0){
                template = DEFAULT_TEMPLATE.replace("{%for}", name).replace("{%v}", message);
                $(elementToAfter).after(template); //append
            } else {
                $(v_element).removeClass("vayw-invalid").addClass("vayw-invalid");
                $(v_element).html("<i class='fa fa-warning'></i> "+message); //append
            }
        }

        if(message != undefined){
            _errors.push(message);
        }
    }
})(jQuery)