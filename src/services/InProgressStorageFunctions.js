const LESS_ONE = -1;

function getFavoriteRecipes() {
  const favoriteRecipes = localStorage.getItem('favoriteRecipes');
  return favoriteRecipes ? JSON.parse(favoriteRecipes) : [];
}

function saveFavoriteRecipes(favoriteRecipes) {
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
}

function createFavoriteRecipeObject(id, recipe) {
  const type = recipe.idMeal ? 'meal' : 'drink';
  const nationality = recipe.strArea || '';
  const category = recipe.strCategory || recipe.strAlcoholic;
  const alcoholicOrNot = recipe.strAlcoholic || '';
  const name = recipe.strMeal || recipe.strDrink;
  const image = recipe.strMealThumb || recipe.strDrinkThumb;

  return {
    id,
    type,
    nationality,
    category,
    alcoholicOrNot,
    name,
    image,
  };
}

export function favRecipe(id, mealId, drinkId) {
  const favoriteRecipes = getFavoriteRecipes();

  const filteredFavorites = favoriteRecipes.filter((favorite) => (
    favorite.id === mealId || favorite.id === drinkId
  ));

  return filteredFavorites.length > 0;
}

export function saveFavRecipe(id, recipe, isFavOrNot) {
  const favoriteRecipes = getFavoriteRecipes();

  const existingRecipeIndex = favoriteRecipes.findIndex((favoriteRecipe) => (
    favoriteRecipe.id === id
  ));

  if (isFavOrNot) {
    if (existingRecipeIndex === LESS_ONE) {
      const fav = createFavoriteRecipeObject(id, recipe);
      favoriteRecipes.push(fav);
    }
  } else if (existingRecipeIndex !== LESS_ONE) {
    favoriteRecipes.splice(existingRecipeIndex, 1);
  }

  saveFavoriteRecipes(favoriteRecipes);
}
