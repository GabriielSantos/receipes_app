import { getDrinks, getDrinksCategories } from './api';

const fetchDrinks = async () => {
  const firstTwelveDrinks = 12;
  const newDrinks = [];
  const drinks = await getDrinks();
  drinks.filter((drink, index) => index < firstTwelveDrinks
      && newDrinks.push(drink));

  return newDrinks;
};

const fetchDrinksByCategory = async () => {
  const firstFiveDrinks = 5;
  const newDrinksCategory = [];
  const drinks = await getDrinksCategories();
  drinks.filter((drink, index) => index < firstFiveDrinks
      && newDrinksCategory.push(drink));

  return newDrinksCategory;
};

export { fetchDrinks, fetchDrinksByCategory };
