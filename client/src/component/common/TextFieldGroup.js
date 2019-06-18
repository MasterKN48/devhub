import React from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types';
export default function TextFieldGroup({name,placeholder,value,label,errors,info,type,onChange,disabled}) {
    return (
        <div className="form-group">
            <label htmlFor={placeholder} className="bmd-label-floating">{name=== 'password2' ? 'Confirm Password' : name==='githubusername' ? 'Github User Name':capitalizeFirstLetter(name)}</label>
            <input 
                id={placeholder}
                type={type}
                value={value} 
                disabled={disabled}
                onChange={onChange} 
                className={
                    classnames("form-control form-control-lg",{'is-invalid':errors})} 
                name={name}
             />
            {info && <small className="form-text text-muted">{info}</small>}
            {errors && (<div className="invalid-feedback">{errors}</div>)}
        </div>
    )
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
TextFieldGroup.propTypes={
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string,
}
TextFieldGroup.defaultProps={
    type:'text'
}