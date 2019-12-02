import React from 'react';

const FormInput = ({ handleChange, label, ...otherProps }) => (
  <div className='group'>
    {label ? (
      <label
        className={`${
          otherProps.value.length ? 'shrink' : ''
        }label`}
      >
        {label}
      </label>
    ) : null}
    <input className='input' onChange={handleChange} {...otherProps} />
  </div>
);

export default FormInput;