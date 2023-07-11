import React from 'react';
import PropTypes from 'prop-types';

function Button({
  children,
  dataTestId = '',
  disabled = false,
  name = '',
  onClick = null,
  submitBtn = false,
}) {
  return (
    <button
      name={ name }
      data-testid={ dataTestId }
      disabled={ disabled }
      onClick={ onClick }
      type={ submitBtn ? 'submit' : 'button' }
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  dataTestId: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  onClick: PropTypes.func,
  submitBtn: PropTypes.bool,
};

export default Button;
