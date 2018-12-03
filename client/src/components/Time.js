import React, { Component } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

const Clock = styled.div`
  font-size: 176px;
  font-weight: 700;
  text-align: center;
`;

const DateContainer = styled.div`
  text-align: center;
  font-size: 48px;
  font-weight: 500;
  text-transform: uppercase;
`;

const CenteredPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

class Time extends Component {
  constructor(props) {
    super(props);
    this.state = {
      now: Date.now()
    };
  }
  componentDidMount() {
    this.timerId = setInterval(() => {
      this.setState({
        now: Date.now()
      });
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerId);
  }
  render() {
    const { now } = this.state;
    return (
      <CenteredPanel>
        <Clock>{format(now, 'h:mm')}</Clock>
        <DateContainer>{format(now, 'EEEE, MMM d')}</DateContainer>
      </CenteredPanel>
    );
  }
}

export default Time;
