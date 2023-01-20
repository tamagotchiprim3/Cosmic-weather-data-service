import { IWeatherCard } from '../interfaces/weather.interface';

export const writeValueInCard = (
  prop: IWeatherCard[],
  key: string,
  value: number,
  add?: string
): void => {
  let conKey: string = key;
  if (add) {
    conKey += add;
  }
  const index = prop.findIndex((item) => {
    return item.key === conKey;
  });
  prop[index] = { ...prop[index], value };
};
