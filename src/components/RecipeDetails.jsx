import React, { useContext, useEffect, useState } from 'react';
import RecipesContext from '../context/RecipesContext';
import { getMealsDetails, getDrinksDetails } from '../services/api';
import { fetchMeals } from '../services/fetchMeals';
import { fetchDrinks } from '../services/fetchDrinks';

function RecipeDetails() {
  const thirteen = 13;
  const six = 6;
  const { idSelected } = useContext(RecipesContext);
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [newMeals, setNewMeals] = useState([]);
  const [newDrinks, setNewDrinks] = useState([]);
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const inProgressRecipes = [JSON.parse(localStorage.getItem('inProgressRecipes')) || {}];

  console.log(inProgressRecipes);

  useEffect(() => {
    if (idSelected.type === 'meal') {
      getMealsDetails(idSelected.id).then((response) => {
        setRecipeDetails([response]);
      });
      fetchDrinks().then((data) => {
        const slicedData = data.slice(0, six);
        setNewDrinks(slicedData);
      });
    }
    if (idSelected.type === 'drink') {
      getDrinksDetails(idSelected.id).then((response) => setRecipeDetails([response]));
      fetchMeals().then((data) => {
        const slicedData = data.slice(0, six);
        setNewMeals(slicedData);
      });
    }
  }, [idSelected]);

  return (
    <>
      <div>
        {idSelected.type === 'meal'
          ? recipeDetails && recipeDetails.map((recipe, index) => (
            <div key={ index }>
              <h1 data-testid="recipe-title">{recipe.strMeal}</h1>
              <img
                src={ recipe.strMealThumb }
                alt={ recipe.strMeal }
                data-testid="recipe-photo"
              />
              <h2 data-testid="recipe-category">{recipe.strCategory}</h2>
              <h3>Ingredients</h3>
              <ul>
                {
                  Object.keys(recipe).map((key) => {
                    if (key.includes('strIngredient') && recipe[key]) {
                      return (
                        <li
                          key={ key }
                          data-testid={ `${index}-${key}-ingredient-name-and-measure` }
                        >
                          {`${recipe[key]} - ${recipe[`strMeasure${key
                            .slice(thirteen)}`]}`}
                        </li>
                      );
                    }
                    return null;
                  })
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
              <h2 data-testid="recipe-category">{recipe.strAlcoholic}</h2>
              <h3>Ingredients</h3>
              <ul>
                {
                  Object.keys(recipe).map((key) => {
                    if (key.includes('strIngredient') && recipe[key]) {
                      return (
                        <li
                          key={ key }
                          data-testid={ `${index}-${key}-ingredient-name-and-measure` }
                        >
                          {`${recipe[key]} - ${recipe[`strMeasure${key
                            .slice(thirteen)}`]}`}
                        </li>
                      );
                    }
                    return null;
                  })
                }
              </ul>
              <h3>Instructions</h3>
              <p data-testid="instructions">{recipe.strInstructions}</p>
            </div>
          ))}
        {
          idSelected.type === 'meal'
            ? newDrinks && newDrinks.map((recipe, index) => (
              <div key={ index }>
                <img
                  src={ recipe.strDrinkThumb }
                  alt={ recipe.strDrink }
                  data-testid={ `${index}-recomendation-card` }
                />
              </div>
            ))
            : newMeals && newMeals.map((recipe, index) => (
              <div key={ index }>
                <img
                  src={ recipe.strMealThumb }
                  alt={ recipe.strMeal }
                  data-testid={ `${index}-recomendation-card` }
                />
              </div>
            ))
        }
      </div>
      <button
        type="button"
        data-testid="start-recipe-btn"
        hidden={ doneRecipes.some((recipe) => recipe.id === idSelected.id) }
      >
        {
          inProgressRecipes.some((recipe) => recipe.id === idSelected.id)
            ? 'Continuar Receita'
            : 'Iniciar Receita'
        }
      </button>
    </>
  );
}

export default RecipeDetails;

// a chave doneRecipes deve conter a seguinte estrutura:
// [{
//     id: 52977,
//     type: meal,
//     nationality: Turkish,
//     category: Side,
//     alcoholicOrNot: null,
//     name: Corba,
//     image: https://www.themealdb.com/images/media/meals/58oia61564916529.jpg,
//     doneDate: 12,
//     tags: Soup
// }]
