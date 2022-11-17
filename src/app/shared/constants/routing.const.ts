export interface IRoutingTemp {
  path: string;
  fullpath: string;
}

export const CORE_PATH: IRoutingTemp = {
  path: '',
  fullpath: '',
};

export const CURRENT_WEATHER_PATH: IRoutingTemp = {
  path: 'current',
  fullpath: '/current',
};

export const HISTORY_WEATHER_PATH: IRoutingTemp = {
  path: 'history',
  fullpath: '/history',
};

export const FORECASTS_WEATHER_PATH: IRoutingTemp = {
  path: 'forecasts',
  fullpath: '/forecasts',
};
