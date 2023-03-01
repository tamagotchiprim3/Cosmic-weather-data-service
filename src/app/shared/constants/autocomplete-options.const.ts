export interface IAutocompleteOption {
  name?: string;
  label: string;
  value: string;
}
export const AUTOCOMPLETE_OPTIONS: IAutocompleteOption[] = [
  {
    label: 'sideBar.select.selectOpts.coordinates',
    value: 'Coordinates',
  },
  {
    label: 'sideBar.select.selectOpts.zip',
    value: 'Zip',
  },
  {
    label: 'sideBar.select.selectOpts.city',
    value: 'City',
  },
];

export const AUTOCOMPLETE_MAP_OPTIONS: IAutocompleteOption[] = [
  {
    name: 'main.weatherCards.map.options.PACO',
    label: 'Convective precipitation',
    value: 'PAC0',
  },
  {
    name: 'main.weatherCards.map.options.PR0',
    label: 'Precipitation intensity',
    value: 'PR0',
  },
  {
    name: 'main.weatherCards.map.options.PA0',
    label: 'Accumulated precipitation',
    value: 'PA0',
  },
  {
    name: 'main.weatherCards.map.options.PAR0',
    label: 'Accumulated precipitation - rain',
    value: 'PAR0',
  },
  {
    name: 'main.weatherCards.map.options.PAS0',
    label: 'Accumulated precipitation - snow',
    value: 'PAS0',
  },
  {
    name: 'main.weatherCards.map.options.SD0',
    label: 'Depth of snow',
    value: 'SD0',
  },
  {
    name: 'main.weatherCards.map.options.WS10',
    label: 'Wind speed at an altitude of 10 meters',
    value: 'WS10',
  },
  {
    name: 'main.weatherCards.map.options.WND',
    label: 'Joint display of speed wind (color) and wind direction (arrows)',
    value: 'WND',
  },
  {
    name: 'main.weatherCards.map.options.APM',
    label: 'Atmospheric pressure on mean sea level',
    value: 'APM',
  },
  {
    name: 'main.weatherCards.map.options.TA2',
    label: 'Air temperature at a height of 2 meters',
    value: 'TA2',
  },
  {
    name: 'main.weatherCards.map.options.TD2',
    label: 'Temperature of a dew point',
    value: 'TD2',
  },
  {
    name: 'main.weatherCards.map.options.TS0',
    label: 'Soil temperature 0-10 сm',
    value: 'TS0',
  },
  {
    name: 'main.weatherCards.map.options.TS10',
    label: 'Soil temperature > 10 сm',
    value: 'TS10',
  },
  {
    name: 'main.weatherCards.map.options.HRD0',
    label: 'Relative humidity',
    value: 'HRD0',
  },
  {
    name: 'main.weatherCards.map.options.CL',
    label: 'Cloudiness',
    value: 'CL',
  },
];
