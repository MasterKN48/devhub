// use validator js for backend validation
const validator=require('validator');
const isEmpty=require('./isValid'); //isempty()
module.exports=function validateProfileInput(data){
    let errors={}
    data.handle=!isEmpty(data.handle) ? data.handle : '';
    data.status=!isEmpty(data.status) ? data.status : '';
    data.skills=!isEmpty(data.skills) ? data.skills : '';
    if(!validator.isLength(data.handle,{min: 2,max:40})){
        errors.handle='Handle Must be Between 2 and 30 chars';
    }
    if(validator.isEmpty(data.handle)){
        errors.handle="Handle field is required";
    }
    if(validator.isEmpty(data.status)){
        errors.status="Status field is required";
    }
    if(validator.isEmpty(data.skills)){
        errors.skills="Skills field is required";
    }
    if(!isEmpty(data.website)){
        if(!validator.isURL(data.website)){
            errors.website="Not Valid URL";
        }
    }
    if(!isEmpty(data.youtube)){
        if(!validator.isURL(data.youtube)){
            errors.youtube="Not Valid URL";
        }
    }
    if(!isEmpty(data.twitter)){
        if(!validator.isURL(data.twitter)){
            errors.twitter="Not Valid URL";
        }
    }
    if(!isEmpty(data.facebook)){
        if(!validator.isURL(data.facebook)){
            errors.facebook="Not Valid URL";
        }
    }
    if(!isEmpty(data.linkedin)){
        if(!validator.isURL(data.linkedin)){
            errors.linkedin="Not Valid URL";
        }
    }

    return {
        errors,
        isValid:isEmpty(errors)
    }
}

