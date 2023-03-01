import { IWeatherCard } from '../interfaces/weather.interface';

export const WEATHER_CARD_TEMPLATE: IWeatherCard[] = [
  {
    name: 'main.weatherCards.smallCards.temperature',
    label: 'Temperature(°С)',
    key: 'temp',
  },
  {
    name: 'main.weatherCards.smallCards.humanPerception',
    label: 'Human perception of weather(°С)',
    key: 'feels_like',
  },
  {
    name: 'main.weatherCards.smallCards.atmoPressure',
    label: 'Atmospheric pressure(hPa)',
    key: 'pressure',
  },
  {
    name: 'main.weatherCards.smallCards.humidity',

    label: 'Humidity(%)',
    key: 'humidity',
  },
  {
    name: 'main.weatherCards.smallCards.minTemp',

    label: 'Minimum temperature at the moment(°С)',
    key: 'temp_min',
  },
  {
    name: 'main.weatherCards.smallCards.maxTemp',

    label: 'Maximum temperature at the moment(°С)',
    key: 'temp_max',
  },
  {
    name: 'main.weatherCards.smallCards.seaLevel',

    label: 'Atmospheric pressure on the sea level(hPa)',
    key: 'sea_level',
  },
  {
    name: 'main.weatherCards.smallCards.grndLevel',

    label: ' Atmospheric pressure on the ground level(hPa)',
    key: 'grnd_level',
  },
  {
    name: 'main.weatherCards.smallCards.visibility',

    label: 'Visibility(m)',
    key: 'visibility',
  },
  {
    name: 'main.weatherCards.smallCards.windSpeed',

    label: 'Wind speed (m/s)',
    key: 'speed',
  },
  {
    name: 'main.weatherCards.smallCards.windDeg',

    label: 'Wind direction(degrees)',
    key: 'deg',
  },
  {
    name: 'main.weatherCards.smallCards.gust',

    label: 'Wind gust(m/s)',
    key: 'gust',
  },
  {
    name: 'main.weatherCards.smallCards.cloud',

    label: 'Cloudiness(%)',
    key: 'all',
  },
  {
    name: 'main.weatherCards.smallCards.rainVolume1h',

    label: 'Rain volume for the last 1 hour(mm)',
    key: '1hr',
  },
  {
    name: 'main.weatherCards.smallCards.rainVolume3h',

    label: 'Rain volume for the last 3 hours(mm)',
    key: '1hr',
  },
  {
    name: 'main.weatherCards.smallCards.snowVolume1h',

    label: 'Snow volume for the last 1 hour(mm)',
    key: '1hs',
  },
  {
    name: 'main.weatherCards.smallCards.snowVolume3h',

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
