import { getMeals } from './api';

export const fetchMeals = async () => {
  const firstTwelveMeals = 12;
  const newMeals = [];
  const meals = await getMeals();
  meals.filter((meal, index) => index < firstTwelveMeals
      && newMeals.push(meal));

  return newMeals;
};
