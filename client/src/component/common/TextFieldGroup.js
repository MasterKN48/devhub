import React from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types';
export default function TextFieldGroup({name,placeholder,value,label,errors,info,type,onChange,disabled}) {
    return (
        <div className="form-group">
            <input 
            type={type}
            value={value} 
            disabled={disabled}
            onChange={onChange} 
            className={
                classnames("form-control form-control-lg",{'is-invalid':errors})} 
            placeholder={placeholder} name={name} />
            {info && <small className="form-text text-muted">{info}</small>}
            {errors && (<div className="invalid-feedback">{errors}</div>)}
        </div>
    )
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