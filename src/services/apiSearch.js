import { switchCaseDrinks, switchCaseMeals } from './utils';

export async function getSearchBar(input, type, route) {
  const URL = (route === '/meals')
    ? switchCaseMeals(input, type)
    : switchCaseDrinks(input, type);

  const response = await fetch(URL);
  const data = await response.json();
  return data;
}
