import { switchCaseDrinks, switchCaseMeals } from './utils';

export async function getSearchBar(input, type, route) {
  const URL = (route === '/drinks')
    ? switchCaseDrinks(input, type)
    : switchCaseMeals(input, type);

  const response = await fetch(URL);
  const data = await response.json();
  return data;
}
