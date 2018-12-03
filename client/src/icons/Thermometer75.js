import React from 'react';

const SvgThermometer75 = props => (
  <svg width={100} height={100} {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M50 67.867a8 8 0 0 1-8-8c0-2.025.76-3.869 2-5.279V37.871a6 6 0 0 1 11.999 0v16.717a7.962 7.962 0 0 1 1.999 5.279c0 4.418-3.58 8-7.998 8zm2-11.445V37.87a2 2 0 0 0-4 0v18.552c-1.19.693-2 1.969-2 3.445a4 4 0 0 0 7.999 0c0-1.476-.81-2.752-1.999-3.445zm-2 6.445c-1.656 0-3-1.344-3-3 0-1.305.838-2.402 2-2.816V41.807h2v15.244c1.162.414 2 1.512 2 2.816 0 1.656-1.344 3-3 3z"
    />
  </svg>
);

export default SvgThermometer75;
