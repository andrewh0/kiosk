import React from 'react';

const SvgCompassWest = props => (
  <svg width={100} height={100} {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M50 35.738c-7.73 0-13.998 6.268-13.998 13.998 0 7.731 6.268 13.999 13.998 13.999 7.731 0 13.998-6.268 13.998-13.999 0-7.731-6.267-13.998-13.998-13.998zm0 23.996c-5.522 0-9.999-4.477-9.999-9.999 0-5.521 4.477-9.998 9.999-9.998s9.999 4.477 9.999 9.998c0 5.523-4.477 9.999-9.999 9.999zm0-13.997c-2.209 0-7.999 3.999-7.999 3.999s5.79 4 7.999 4a4 4 0 0 0 0-7.999zm0 4.999a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
    />
  </svg>
);

export default SvgCompassWest;
