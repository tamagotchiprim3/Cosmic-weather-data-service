import { IWeatherCard } from '../interfaces/weather.interface';

export const WEATHER_CARD_TEMPLATE: IWeatherCard[] = [
  {
    label: 'Temperature(°С)',
    key: 'temp',
  },
  {
    label: 'Human perception of weather(°С)',
    key: 'feels_like',
  },
  {
    label: 'Atmospheric pressure(hPa)',
    key: 'pressure',
  },
  {
    label: 'Humidity(%)',
    key: 'humidity',
  },
  {
    label: 'Minimum temperature at the moment(°С)',
    key: 'temp_min',
  },
  {
    label: 'Maximum temperature at the moment(°С)',
    key: 'temp_max',
  },
  {
    label: 'Atmospheric pressure on the sea level(hPa)',
    key: 'sea_level',
  },
  {
    label: ' Atmospheric pressure on the ground level(hPa)',
    key: 'grnd_level',
  },
  {
    label: 'Visibility(m)',
    key: 'visibility',
  },
  {
    label: 'Wind speed (m/s)',
    key: 'speed',
  },
  {
    label: 'Wind direction(degrees)',
    key: 'deg',
  },
  {
    label: 'Wind gust(m/s)',
    key: 'gust',
  },
  {
    label: 'Cloudiness(%)',
    key: 'all',
  },
  {
    label: 'Rain volume for the last 1 hour(mm)',
    key: '1hr',
  },
  {
    label: 'Rain volume for the last 3 hours(mm)',
    key: '1hr',
  },
  {
    label: 'Snow volume for the last 1 hour(mm)',
    key: '1hs',
  },
  {
    label: 'Snow volume for the last 3 hours(mm)',
    key: '1hr',
  },
];

export const AIR_POLLUTION_CARD_TEMPLATE: IWeatherCard[] = [
  {
    label: 'CO:',
    key: 'co',
  },
  {
    label: 'NO:',
    key: 'no',
  },
  {
    label: 'NO₂:',
    key: 'no2',
  },
  {
    label: 'O₃:',
    key: 'o3',
  },
  {
    label: 'SO₂:',
    key: 'so2',
  },
  {
    label: 'PM₂₅:',
    key: 'pm2_5',
  },
  {
    label: 'PM₁₀:',
    key: 'pm10',
  },
  {
    label: 'NH₃:',
    key: 'nh3',
  },
];
