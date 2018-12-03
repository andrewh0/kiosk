import React from 'react';
import styled from 'styled-components';
import Time from './Time';
import Stocks from './Stocks';
import News from './News';
import Weather from './Weather';

const Panels = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  display: flex;
  flex-wrap: wrap;
  overflow: scroll;
  overflow-x: hidden;
`;

const Panel = styled.div`
  // border: 1px solid white;
  background-color: black;
  width: 50%;
  height: 50%;
  display: flex;
  flex-wrap: wrap;
  overflow: scroll;
`;

const Home = _props => (
  <Panels>
    <Panel>
      <Time />
    </Panel>
    <Panel>
      <Weather />
    </Panel>
    <Panel>
      <News />
    </Panel>
    <Panel>
      <Stocks />
    </Panel>
  </Panels>
);

export default Home;
