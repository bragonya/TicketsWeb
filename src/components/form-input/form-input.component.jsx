import React from 'react';

const FormInput = ({ handleChange,className, label, ...otherProps }) => (
  <div className={className?`group${className}`:'group'}>
    {label ? (
      <label
        className={'label'}
      >
        {label}
      </label>
    ) : null}
    <input 
      onInput={evt=>evt.target.setCustomValidity('')} 
      onInvalid={evt=>evt.target.setCustomValidity('Este campo es requerido')} 
      className='input' 
      onChange={handleChange} {...otherProps} />
  </div>
);

export default FormInput;