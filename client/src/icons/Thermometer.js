import React from 'react';

const SvgThermometer = props => (
  <svg width={100} height={100} {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M50 67.997a7.999 7.999 0 0 1-7.999-7.999c0-2.025.759-3.869 1.999-5.278V38.001a6 6 0 0 1 11.999 0V54.72a7.963 7.963 0 0 1 2 5.278A8 8 0 0 1 50 67.997zm1.999-11.444V38.001a2 2 0 0 0-3.999 0v18.552c-1.19.693-2 1.969-2 3.445a4 4 0 0 0 7.999 0c0-1.477-.81-2.752-2-3.445z"
    />
  </svg>
);

export default SvgThermometer;
