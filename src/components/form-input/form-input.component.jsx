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
    <input className='input' onChange={handleChange} {...otherProps} />
  </div>
);

export default FormInput;