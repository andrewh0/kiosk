import React from 'react';

const SvgMoonFull = props => (
  <svg width={100} height={100} {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M50 61.998c-6.627 0-12-5.372-12-11.999 0-6.626 5.373-11.998 12-11.998s11.998 5.372 11.998 11.998c0 6.627-5.371 11.999-11.998 11.999zm0-19.997A8 8 0 1 0 49.999 58 8 8 0 0 0 50 42z"
    />
  </svg>
);

export default SvgMoonFull;
