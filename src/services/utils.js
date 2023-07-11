const switchCaseMeals = (input, type) => {
  switch (type) {
  case ('Ingredient'):
    return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`;
  case ('Name'):
    return `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`;
  case ('First Letter'):
    return `https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`;
  default:
    throw new Error('Pesquisa Inválida');
  }
};

const switchCaseDrinks = (input, type) => {
  switch (type) {
  case ('Ingredient'):
    return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${input}`;
  case ('Name'):
    return `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`;
  case ('First Letter'):
    return `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${input}`;
  default:
    throw new Error('Pesquisa Inválida');
  }
};
export { switchCaseDrinks, switchCaseMeals };
