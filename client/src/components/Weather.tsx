import React, { Component } from 'react';
import styled from 'styled-components';
import { get } from 'lodash';
import 'isomorphic-fetch';
import { format } from 'date-fns';
import {
  SvgSun,
  SvgMoon,
  SvgCloudRain,
  SvgCloudSnow,
  SvgCloudHailAlt,
  SvgWind,
  SvgCloudFogAlt,
  SvgCloud,
  SvgCloudSun,
  SvgCloudMoon,
  SvgCloudHail,
  SvgCloudLightning,
  SvgTornado
} from '../icons/WeatherIcons';

type WeatherCurrently = {
  apparentTemperature: number;
  cloudCover: number;
  dewPoint: number;
  humidity: number;
  icon: string;
  nearestStormDistance: number;
  ozone: number;
  precipIntensity: number;
  precipIntensityError: number;
  precipProbability: number;
  precipType: string;
  pressure: number;
  summary: string;
  temperature: number;
  time: number;
  uvIndex: number;
  visibility: number;
  windBearing: number;
  windGust: number;
  windSpeed: number;
};

type WeatherDailyData = {
  apparentTemperatureHigh: number;
  apparentTemperatureHighTime: number;
  apparentTemperatureLow: number;
  apparentTemperatureLowTime: number;
  apparentTemperatureMax: number;
  apparentTemperatureMaxTime: number;
  apparentTemperatureMin: number;
  apparentTemperatureMinTime: number;
  cloudCover: number;
  dewPoint: number;
  humidity: number;
  icon: string;
  moonPhase: number;
  ozone: number;
  precipIntensity: number;
  precipIntensityMax: number;
  precipIntensityMaxTime: number;
  precipProbability: number;
  precipType: string;
  pressure: number;
  summary: string;
  sunriseTime: number;
  sunsetTime: number;
  temperatureHigh: number;
  temperatureHighTime: number;
  temperatureLow: number;
  temperatureLowTime: number;
  temperatureMax: number;
  temperatureMaxTime: number;
  temperatureMin: number;
  temperatureMinTime: number;
  time: number;
  uvIndex: number;
  uvIndexTime: number;
  visibility: number;
  windBearing: number;
  windGust: number;
  windGustTime: number;
  windSpeed: number;
};

type WeatherProps = { path?: string };

type WeatherState = {
  data: {
    currently: WeatherCurrently;
    daily: {
      icon: string;
      summary: string;
      data: Array<WeatherDailyData>;
    };
  } | null;
};

export type WeatherIconProps = {
  width: string;
  height: string;
  viewBox?: string;
  fill?: string;
};

const iconComponentMap: {
  [iconName: string]: React.FunctionComponent<WeatherIconProps>;
} = {
  'clear-day': SvgSun,
  'clear-night': SvgMoon,
  'partly-cloudy-day': SvgCloudSun,
  'partly-cloudy-night': SvgCloudMoon,
  rain: SvgCloudRain,
  snow: SvgCloudSnow,
  sleet: SvgCloudHailAlt,
  wind: SvgWind,
  fog: SvgCloudFogAlt,
  cloudy: SvgCloud,
  hail: SvgCloudHail,
  thunderstorm: SvgCloudLightning,
  tornado: SvgTornado
};

const WeatherIconContainer = styled.div`
  display: flex;
  flex-direction: center;
  align-items: center;
  justify-content: center;
`;

const WeatherIcon = ({
  Component,
  width = '182',
  height = '182',
  viewBox = '15 15 70 70',
  fill = '#fff',
  ...props
}: {
  Component: React.FunctionComponent<WeatherIconProps>;
  width?: string;
  height?: string;
  viewBox?: string;
  fill?: string;
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

const WeatherContainer = styled.div`
  padding: 32px;
`;

const TempHiLo = styled.div`
  font-size: 32px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: ${(props: { vertical?: boolean }) =>
    props.vertical ? 'flex-end' : 'center'};
  flex-direction: ${props => (props.vertical ? 'column' : 'row')};
  width: ${props => (props.vertical ? '56px' : 'auto')};
`;

const TempHi = styled.span`
  color: white;
  margin-right: ${(props: { compact?: boolean }) =>
    props.compact ? '0' : '16px'};
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

class Weather extends Component<WeatherProps, WeatherState> {
  constructor(props: WeatherProps) {
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
          <WeatherContainer>
            <WeatherIcon Component={iconComponentMap[icon]} />
            <TempNow>{Math.round(temperatureNow)}</TempNow>
            <TempHiLo>
              <TempHi>{Math.round(temperatureHigh)}</TempHi>
              <TempLo>{Math.round(temperatureLow)}</TempLo>
            </TempHiLo>
          </WeatherContainer>
        </SubPanel>
        <SubPanel>
          <ForecastContainer>
            {nextThreeDays.map((day: WeatherDailyData, i: number) => (
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
