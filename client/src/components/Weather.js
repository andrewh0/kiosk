import React, { Component } from 'react';
import styled from 'styled-components';
import { get } from 'lodash';
import 'isomorphic-fetch';
import { format } from 'date-fns';

import Sun from '../icons/Sun.js';
import Moon from '../icons/Moon.js';
import CloudRain from '../icons/CloudRain.js';
import CloudSnow from '../icons/CloudSnow.js';
import CloudHailAlt from '../icons/CloudHailAlt.js';
import Wind from '../icons/Wind.js';
import CloudFogAlt from '../icons/CloudFogAlt.js';
import Cloud from '../icons/Cloud.js';
import CloudSun from '../icons/CloudSun.js';
import CloudMoon from '../icons/CloudMoon.js';
import CloudHail from '../icons/CloudHail.js';
import CloudLightning from '../icons/CloudLightning.js';
import Tornado from '../icons/Tornado.js';

const iconComponentMap = {
  'clear-day': Sun,
  'clear-night': Moon,
  'partly-cloudy-day': CloudSun,
  'partly-cloudy-night': CloudMoon,
  rain: CloudRain,
  snow: CloudSnow,
  sleet: CloudHailAlt,
  wind: Wind,
  fog: CloudFogAlt,
  cloudy: Cloud,
  hail: CloudHail,
  thunderstorm: CloudLightning,
  tornado: Tornado
};

const WeatherIconContainer = styled.div`
  display: flex;
  flex-direction: center;
  align-items: center;
  justify-content: center;
`;

const WeatherIcon = ({
  Component,
  width = '200',
  height = '200',
  viewBox = '15 15 70 70',
  fill = '#fff',
  ...props
}) => (
  <WeatherIconContainer>
    <Component
      width={width}
      height={height}
      viewBox={viewBox}
      fill={fill}
      {...props}
    />
  </WeatherIconContainer>
);

const TempHiLo = styled.div`
  font-size: 32px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: ${props => (props.vertical ? 'flex-end' : 'center')};
  flex-direction: ${props => (props.vertical ? 'column' : 'row')};
  width: ${props => (props.vertical ? '56px' : 'auto')};
`;

const TempHi = styled.span`
  color: white;
  margin-right: ${props => (props.compact ? '0' : '16px')};
`;

const TempLo = styled.span`
  color: #999;
`;

const TempNow = styled.div`
  color: white;
  font-size: 96px;
  font-weight: 700;
  text-align: center;
`;

const SubPanel = styled.div`
  width: 50%;
  height: 100%;
  // border: 1px solid white;
`;

const ForecastContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
`;

const ForecastDay = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: 32px;
  margin-right: 32px;
`;

const DayLabel = styled.span`
  width: 72px;
  display: inline-block;
  font-size: 32px;
  text-transform: uppercase;
  font-weight: 500;
  text-align: left;
`;

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }
  componentDidMount() {
    fetch('/api/weather')
      .then(res => res.json())
      .then(data => {
        this.setState({ data });
      });
  }
  render() {
    const { data } = this.state;
    const temperatureHigh =
      typeof get(data, ['daily', 'data', 0, 'temperatureMax']) === 'number'
        ? get(data, ['daily', 'data', 0, 'temperatureMax'])
        : null;
    const temperatureNow =
      typeof get(data, ['currently', 'temperature']) === 'number'
        ? get(data, ['currently', 'temperature'])
        : null;
    const temperatureLow =
      typeof get(data, ['daily', 'data', 0, 'temperatureMin']) === 'number'
        ? get(data, ['daily', 'data', 0, 'temperatureMin'])
        : null;
    const icon = get(data, ['currently', 'icon']);
    const nextThreeDays = (get(data, ['daily', 'data']) || []).slice(1, 4);
    return !data ? null : (
      <>
        <SubPanel>
          <WeatherIcon Component={iconComponentMap[icon]} />
          <TempNow>{Math.round(temperatureNow)}</TempNow>
          <TempHiLo>
            <TempHi>{Math.round(temperatureHigh)}</TempHi>
            <TempLo>{Math.round(temperatureLow)}</TempLo>
          </TempHiLo>
        </SubPanel>
        <SubPanel>
          <ForecastContainer>
            {nextThreeDays.map((day, i) => (
              <ForecastDay key={i}>
                <DayLabel>{format(day.time * 1000, 'E')}</DayLabel>
                <WeatherIcon
                  Component={iconComponentMap[day.icon]}
                  width="96"
                  height="96"
                />
                <TempHiLo vertical={true}>
                  <TempHi compact={true}>
                    {Math.round(day.temperatureHigh)}
                  </TempHi>
                  <TempLo>{Math.round(day.temperatureLow)}</TempLo>
                </TempHiLo>
              </ForecastDay>
            ))}
          </ForecastContainer>
        </SubPanel>
      </>
    );
  }
}

export default Weather;
