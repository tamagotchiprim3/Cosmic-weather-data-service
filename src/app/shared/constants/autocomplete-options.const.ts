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
