// use validator js for backend validation
const validator=require('validator');
const isEmpty=require('./isValid'); //isempty()
module.exports=function validatePostInput(data){
    let errors={}
    data.text=!isEmpty(data.text) ? data.text : '';
    
    if(!validator.isLength(data.text,{min:10,max:5000})){
        errors.text="Post must be atleast 10 chars to 5000 chars";
    }
    if(validator.isEmpty(data.text)){
        errors.text="Text field is required";
    }
    return {
        errors,
        isValid:isEmpty(errors)
    }
}

