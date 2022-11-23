export interface IAutocompleteOption {
  label: string;
  value: string;
}
export const AUTOCOMPLETE_OPTIONS: IAutocompleteOption[] = [
  {
    label: 'coordinates',
    value: 'coordinates',
  },
  {
    label: 'zip code',
    value: 'zip',
  },
  {
    label: 'city',
    value: 'city',
  },
];

export const AUTOCOMPLETE_MAP_OPTIONS: IAutocompleteOption[] = [
  {
    label: 'Convective precipitation',
    value: 'PAC0',
  },
  {
    label: 'Precipitation intensity',
    value: 'PR0',
  },
  {
    label: 'Accumulated precipitation',
    value: 'PA0',
  },
  {
    label: 'Accumulated precipitation - rain',
    value: 'PAR0',
  },
  {
    label: 'Accumulated precipitation - snow',
    value: 'PAS0',
  },
  {
    label: 'Depth of snow',
    value: 'SD0',
  },
  {
    label: 'Wind speed at an altitude of 10 meters',
    value: 'WS10',
  },
  {
    label: 'Joint display of speed wind (color) and wind direction (arrows),',
    value: 'WND',
  },
  {
    label: 'Atmospheric pressure on mean sea level',
    value: 'APM',
  },
  {
    label: 'Air temperature at a height of 2 meters',
    value: 'TA2',
  },
  {
    label: 'Temperature of a dew point',
    value: 'TD2',
  },
  {
    label: 'Soil temperature 0-10 сm',
    value: 'TS0',
  },
  {
    label: 'Soil temperature >10 сm',
    value: 'TS10',
  },
  {
    label: 'Relative humidity',
    value: 'HRD0',
  },
  {
    label: 'Cloudiness',
    value: 'CL',
  },
];
