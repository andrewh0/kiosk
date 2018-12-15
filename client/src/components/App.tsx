import React from 'react';
import styled from 'styled-components';
import { Router } from '@reach/router';
import Home from './Home';
import Time from './Time';
import Stocks from './Stocks';
import News from './News';
import Weather from './Weather';

const StyledRouter = styled(Router)`
  color: white;
  min-height: 100%;
  height: 100%;
`;

const App = (_props: {}) => (
  <StyledRouter>
    <Home path="/" />
    <Home path="/settings" />
    <Weather path="/weather" />
    <News path="/news" />
    <Stocks path="/stocks" />
    <Time path="/time" />
  </StyledRouter>
);

export default App;
