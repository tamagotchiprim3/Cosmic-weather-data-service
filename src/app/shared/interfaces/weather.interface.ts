export interface IWeatherForm {
  latitude: number;
  longitude: number;
  city: string;
  zip: number;
}

export interface IMapForm {
  op: string;
  z: number;
  x: number;
  y: number;
}

export interface IGetCurrentWeather {
  lat: number;
  lon: number;
}

export interface IGetCurrentWeatherResponse {
  coord: IGetCurrentWeather;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  rain: {
    '1h': number;
    '3h'?: number;
  };
  snow: {
    '1h': number;
    '3h'?: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface IWeatherCard {
  label?: string;
  key?: string;
  value?: any;
}

export interface IAirPollutionResponse {
  date?: Date;
  coord: number[];
  list: {
    dt: number;
    main: {
      aqi: number;
    };
    components: IAirComponents;
  }[];
}

export interface IAirComponents {
  co: number;
  no: number;
  no2: number;
  o3: number;
  so2: number;
  pm2_5: number;
  pm10: number;
  nh3: number;
}
