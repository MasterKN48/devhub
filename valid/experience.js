// use validator js for backend validation
const validator=require('validator');
const isEmpty=require('./isValid'); //isempty()
module.exports=function validateExpInput(data){
    let errors={}
    data.title=!isEmpty(data.title) ? data.title : '';
    data.company=!isEmpty(data.company) ? data.company : '';
    data.from=!isEmpty(data.from) ? data.from : '';
    if(validator.isEmpty(data.title)){
        errors.title="Job Title field is required";
    }
    if(validator.isEmpty(data.company)){
        errors.company="Company field is required";
    }
    if(validator.isEmpty(data.from)){
        errors.from="from date field is required";
    }
    
    return {
        errors,
        isValid:isEmpty(errors)
    }
}

