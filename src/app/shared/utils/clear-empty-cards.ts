import { IWeatherCard } from '../interfaces/weather.interface';

export const clearEmptyCards = (cards: IWeatherCard[]): IWeatherCard[] => {
  return cards.filter((item) => {
    return item.value;
  });
};
