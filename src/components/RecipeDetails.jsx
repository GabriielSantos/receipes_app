import React, { useEffect, useState, useMemo, useContext } from 'react';
import copy from 'clipboard-copy';
import { getMealsDetails, getDrinksDetails } from '../services/api';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import RecipesContext from '../context/RecipesContext';
import '../style/recipeDetails.css';

function RecipeDetails() {
  const thirteen = 13;
  const six = 6;
  const { route,
    newDrinks,
    newMeals } = useContext(RecipesContext);
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
  const favoriteRecipes = useMemo(() => JSON
    .parse(localStorage.getItem('favoriteRecipes')) || [], []);

  const pathParts = route.location.pathname.split('/');
  const idFromPath = pathParts[pathParts.length - 1];
  const typeFromPath = pathParts[pathParts.length - 2];
  const idSelected = {
    id: idFromPath,
    type: typeFromPath,
  };

  const drinksSlice = newDrinks.slice(0, six);
  const mealsSlice = newMeals.slice(0, six);

  useEffect(() => {
    const recipeFavorited = favoriteRecipes.some(
      (recipe) => recipe.id === idSelected.id,
    );
    setIsFavorite(recipeFavorited);
  }, [idSelected.id, favoriteRecipes]);

  useEffect(() => {
    if (idSelected.type === 'meals') {
      getMealsDetails(idSelected.id).then((data) => setRecipeDetails([data]));
    }
    if (idSelected.type === 'drinks') {
      getDrinksDetails(idSelected.id).then((data) => setRecipeDetails([data]));
    }
  }, [idSelected.id, idSelected.type]);

  const handleShare = () => {
    const url = window.location.href;
    copy(url).then(() => {
      const time = 2000;
      const alert = document.getElementById('alert');
      alert.innerHTML = 'Link copied!';
      setTimeout(() => {
        alert.innerHTML = '';
      }, time);
    });
  };

  const handleFavorite = (type) => {
    const recDetails = recipeDetails[0];
    if (type === 'meals') {
      type = 'Meal';
    }
    if (type === 'drinks') {
      type = 'Drink';
    }

    if (isFavorite) {
      const updatedFavoriteRecipes = favoriteRecipes.filter(
        (recipe) => recipe.id !== recDetails[`id${type}`],
      );
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify(updatedFavoriteRecipes),
      );
      setIsFavorite(false);
    } else {
      const newFavoriteRecipe = {
        id: recDetails[`id${type}`],
        type: type.toLowerCase(),
        nationality: recDetails.strArea || '',
        category: recDetails.strCategory || '',
        alcoholicOrNot: recDetails.strAlcoholic || '',
        name: recDetails[`str${type}`],
        image: recDetails[`str${type}Thumb`],
      };
      const updatedFavoriteRecipes = [...favoriteRecipes, newFavoriteRecipe];
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify(updatedFavoriteRecipes),
      );
      setIsFavorite(true);
    }
  };

  const showIngredients = () => {
    const ingredients = [];
    const recDetails = recipeDetails[0];
    for (let index = 1; index <= thirteen; index += 1) {
      if (recDetails[`strIngredient${index}`]) {
        ingredients.push(
          `${recDetails[`strIngredient${index}`]} - ${recDetails[`strMeasure${index}`]}`,
        );
      }
    }
    return ingredients.map((ingredient, index) => (
      <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
        {ingredient}
      </li>
    ));
  };

  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleShare }
      >
        <img src={ shareIcon } alt="Share" />
      </button>
      <button
        type="button"
        onClick={ () => handleFavorite(idSelected.type) }
      >
        <img
          data-testid="favorite-btn"
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt={ isFavorite ? 'Favorite' : 'Not Favorite' }
        />
      </button>
      <p id="alert" />

      {idSelected.type === 'meals'
        ? recipeDetails && recipeDetails.map((recipe, index) => (
          <div key={ index } className="recipeContainer">
            <h1 data-testid="recipe-title">{recipe.strMeal}</h1>
            <img
              src={ recipe.strMealThumb }
              alt={ recipe.strMeal }
              data-testid="recipe-photo"
            />
            <h2 data-testid="recipe-category">
              {recipe.strCategory}
            </h2>
            <h3>Ingredients</h3>
            <ul>
              {
                showIngredients()
              }
            </ul>
            <h3>Instructions</h3>
            <p data-testid="instructions">{recipe.strInstructions}</p>
            <iframe
              title="video"
              data-testid="video"
              width="320"
              height="240"
              src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
            />
          </div>
        ))
        : recipeDetails && recipeDetails.map((recipe, index) => (
          <div key={ index }>
            <h1 data-testid="recipe-title">{recipe.strDrink}</h1>
            <img
              src={ recipe.strDrinkThumb }
              alt={ recipe.strDrink }
              data-testid="recipe-photo"
            />
            <h2 data-testid="recipe-category">
              {
                recipe.strAlcoholic === 'Alcoholic'
                  ? `${recipe.strCategory} - ${recipe.strAlcoholic}`
                  : recipe.strCategory
              }
            </h2>
            <h3>Ingredients</h3>
            <ul>
              {
                showIngredients()
              }
            </ul>
            <h3>Instructions</h3>
            <p data-testid="instructions">{recipe.strInstructions}</p>
          </div>
        ))}
      <div
        className="containerRecommendations"
      >
        {
          idSelected.type === 'meals'
            ? drinksSlice && drinksSlice.map((recipe, index) => (
              <div key={ index }>
                <img
                  src={ recipe.strDrinkThumb }
                  alt={ recipe.strDrink }
                  data-testid={ `${index}-recommendation-card` }
                />
                <h3
                  data-testid={ `${index}-recommendation-title` }
                >
                  {recipe.strDrink}
                </h3>
              </div>
            ))
            : mealsSlice && mealsSlice.map((recipe, index) => (
              <div key={ index }>
                <img
                  src={ recipe.strMealThumb }
                  alt={ recipe.strMeal }
                  data-testid={ `${index}-recommendation-card` }
                />
                <h3
                  data-testid={ `${index}-recommendation-title` }
                >
                  {recipe.strMeal}
                </h3>
              </div>
            ))
        }
      </div>
      <button
        className="start-btn"
        type="button"
        data-testid="start-recipe-btn"
        hidden={ doneRecipes.some((recipe) => recipe.id === idSelected.id) }
        onClick={ () => route
          .push(`/${idSelected.type}/${idSelected.id}/in-progress`) }
      >
        {
          inProgressRecipes[idSelected.type]
            && inProgressRecipes[idSelected.type][idSelected.id]
            ? 'Continue Recipe'
            : 'Start Recipe'
        }
      </button>
    </div>
  );
}
export default RecipeDetails;
