import { IWeatherCard } from '../interfaces/weather.interface';

export const writeValueInCard = (
  prop: IWeatherCard[],
  key: string,
  value: number,
  add?: string
) => {
  let conKey: string = key;
  if (add) {
    conKey += add;
  }
  prop[
    prop.findIndex((item) => {
      return item.key === conKey;
    })
  ].value = value;
};
