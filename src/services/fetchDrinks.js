import { getDrinks } from './api';

export const fetchDrinks = async () => {
  const firstTwelveDrinks = 12;
  const newDrinks = [];
  const drinks = await getDrinks();
  drinks.filter((drink, index) => index < firstTwelveDrinks
      && newDrinks.push(drink));

  return newDrinks;
};
