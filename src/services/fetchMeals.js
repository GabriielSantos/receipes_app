import { getMeals, getMealsCategories } from './api';

const fetchMeals = async () => {
  const firstTwelveMeals = 12;
  const newMeals = [];
  const meals = await getMeals();
  meals.filter((meal, index) => index < firstTwelveMeals
      && newMeals.push(meal));

  return newMeals;
};

const fetchMealsByCategory = async () => {
  const firstFiveMeals = 5;
  const newMealsCategory = [];
  const meals = await getMealsCategories();
  meals.filter((meal, index) => index < firstFiveMeals
      && newMealsCategory.push(meal));

  return newMealsCategory;
};

export { fetchMeals, fetchMealsByCategory };
