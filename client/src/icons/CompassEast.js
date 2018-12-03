import React from 'react';

const SvgCompassEast = props => (
  <svg width={100} height={100} {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M50 35.87c-7.732 0-14 6.268-14 13.998 0 7.732 6.268 14 14 14 7.73 0 13.998-6.268 13.998-14 0-7.731-6.268-13.998-13.998-13.998zm0 23.997c-5.523 0-10-4.477-10-10 0-5.521 4.477-9.998 10-9.998 5.521 0 9.998 4.477 9.998 9.998 0 5.524-4.477 10-9.998 10zm0-13.998a4 4 0 1 0 0 7.999c2.207 0 7.998-4 7.998-4S52.207 45.869 50 45.869zm0 4.999a1 1 0 1 1-.002-1.998A1 1 0 0 1 50 50.868z"
    />
  </svg>
);

export default SvgCompassEast;