import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function RecipesFilterSuccess() {
  const { data, route } = useContext(RecipesContext);
  const maxItens = 12;
  return (
    <div>
      {
        (route.location.pathname === '/meals')
          ? (
            data.meals.slice(0, maxItens).map((meal, index) => (
              <button
                key={ index }
                data-testid={ `${index}-recipe-card` }
                onClick={ () => handleCardClick(meal.idMeal) }
              >
                <img
                  src={ meal.strMealThumb }
                  alt={ meal.strMeal }
                  data-testid={ `${index}-card-img` }
                />
                <h2 data-testid={ `${index}-card-name` }>{meal.strMeal}</h2>
              </button>
            )))
          : (
            data.drinks.slice(0, maxItens).map((drink, index) => (
              <button
                key={ index }
                data-testid={ `${index}-recipe-card` }
                onClick={ () => handleCardClick(drink.idDrink) }
              >
                <img
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                  data-testid={ `${index}-card-img` }
                />
                <h2 data-testid={ `${index}-card-name` }>{drink.strDrink}</h2>
              </button>
            ))
          )
      }
    </div>
  );
}

export default RecipesFilterSuccess;
