export interface IRoutingTemp {
  path: string;
  fullpath: string;
}

export const CORE_PATH: IRoutingTemp = {
  path: '',
  fullpath: '',
};

export const WEATHER_PATH: IRoutingTemp = {
  path: 'current',
  fullpath: '/current',
};
