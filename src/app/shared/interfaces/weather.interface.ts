export interface IWeatherForm {
  latitude: number;
  longitude: number;
  city: string;
  zip: number;
}

export interface IGetWeather {
  lat: number;
  lon: number;
}

export interface IGetCurrentWeatherResponse {
  coord: IGetWeather;
  weather: IWeatherDesc[];
  base: string;
  main: IMainData;
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

export interface ILocation {
  name: string;
  timezone: string;
  latitude: number | string;
  longitude: number | string;
}

export interface IHourlyForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: IHourForecast[];
}

export interface IHourForecast {
  dt: number;
  main: IMainData;
  weather: IWeatherDesc[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  rain: {
    '1h': number;
    '3h'?: number;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export interface IMainData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface IWeatherDesc {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IMonthlyForecastResponse {
  cod: string;
  city: {
    id: number;
    name: string;
    coord: {
      lon: number;
      lat: number;
    };
    country: string;
  };
  message: string;
  list?: ICalendarDay[];
}

export interface ICalendarDay {
  dt: number;
  dt_txt: Date;
  sunrise_txt: Date;
  sunset_txt: Date;
  sunrise: number;
  sunset: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  speed: number;
  deg: number;
  clouds: number;
  rain: number;
}
