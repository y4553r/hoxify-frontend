import React from 'react';

const Input = ({ label, type, placeholder, value, onChange, hasError, error }) => {
  let classes = 'form-control';
  if (hasError)
    classes += hasError ? ' is-invalid' : ' is-valid';

  return (
    <div>
      {label && <label>{label}</label>}
      <input
        className={classes}
        type={type || 'text'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {hasError && <span className='invalid-feedback'>{error}</span>}
    </div>
  );
}

Input.defaultProps = {
  onChange: () => { }
}
export default Input;