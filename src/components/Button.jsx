import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

function Button({
  label, operation, double, triple, click,
}) {
  return (
    <button
      onClick={click(label)}
      type="button"
      className={`button ${operation} ${double} ${triple}`}
    >
      {label}
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  operation: PropTypes.string,
  double: PropTypes.string,
  triple: PropTypes.string,
  click: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.any,
  ]),
};

Button.defaultProps = {
  operation: '',
  double: '',
  triple: '',
  click: () => null,
};

export default Button;
