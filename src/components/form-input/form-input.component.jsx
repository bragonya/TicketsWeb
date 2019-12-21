import React from 'react';

const FormInput = ({ handleChange,className, label, classNameInput,...otherProps }) => (
  <div className={className?`group${className}`:'group'}>
    {label ? (
      <label
        className={'label'}
      >
        {label}
      </label>
    ) : null}
    <input 
      //onInput={evt=>evt.target.setCustomValidity('')} 
      //onInvalid={evt=>evt.target.setCustomValidity('Este campo es requerido')} 
      className={classNameInput?classNameInput:'input' }
      onChange={handleChange} {...otherProps} />
  </div>
);

export default FormInput;