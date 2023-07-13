import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { getDrinksByCategory, getMealsByCategory } from '../services/api';
import { fetchDrinks, fetchDrinksByCategory } from '../services/fetchDrinks';
import { fetchMeals, fetchMealsByCategory } from '../services/fetchMeals';
import RecipesContext from '../context/RecipesContext';

function Recipes() {
  const history = useHistory();
  const [meals, setMealsByFilter] = useState([]);
  const [drinks, setDrinksByFilter] = useState([]);
  const [newDrinks, setNewDrinks] = useState([]);
  const [newMeals, setNewMeals] = useState([]);
  const [newMealsByCategory, setNewMealsByCategory] = useState([]);
  const [newDrinksByCategory, setNewDrinksByCategory] = useState([]);
  const [category, setCategory] = useState('');
  const { setIdSelected } = useContext(RecipesContext);

  useEffect(() => {
    fetchMeals().then((data) => {
      setNewMeals(data);
      setMealsByFilter(data);
    });
    fetchDrinks().then((data) => {
      setNewDrinks(data);
      setDrinksByFilter(data);
    });
    fetchMealsByCategory().then((data) => setNewMealsByCategory(data));
    fetchDrinksByCategory().then((data) => setNewDrinksByCategory(data));
  }, []);

  useEffect(() => {
    const twelve = 12;
    if (category !== '') {
      if (history.location.pathname === '/meals') {
        getMealsByCategory(category)
          .then((data) => {
            const filteredMeals = data.filter((_, index) => index < twelve);
            setMealsByFilter(filteredMeals);
          });
      } else if (history.location.pathname === '/drinks') {
        getDrinksByCategory(category)
          .then((data) => {
            const filteredDrinks = data.filter((_, index) => index < twelve);
            setDrinksByFilter(filteredDrinks);
          });
      }
    } else {
      setMealsByFilter(newMeals);
      setDrinksByFilter(newDrinks);
    }
  }, [category, history.location.pathname, newDrinks, newMeals]);

  const handleCategoryFilter = (selectedCategory) => {
    if (selectedCategory === category) {
      setCategory('');
    } else {
      setCategory(selectedCategory);
    }
  };

  const handleRemoveFilter = () => {
    setCategory('');
  };

  const handleCardClick = (id, type) => {
    const currentPath = history.location.pathname;
    if (currentPath === '/meals') {
      history.push(`/meals/${id}`);
    } else if (currentPath === '/drinks') {
      history.push(`/drinks/${id}`);
    }
    setIdSelected({ id, type });
  };

  return (
    <>
      <div>
        {history.location.pathname === '/meals' ? (
          newMealsByCategory.map((meal, index) => (
            <button
              key={ index }
              type="button"
              data-testid={ `${meal.strCategory}-category-filter` }
              onClick={ () => handleCategoryFilter(meal.strCategory) }
            >
              {meal.strCategory}
            </button>
          ))
        ) : (
          newDrinksByCategory.map((drink, index) => (
            <button
              key={ index }
              type="button"
              data-testid={ `${drink.strCategory}-category-filter` }
              onClick={ () => handleCategoryFilter(drink.strCategory) }
            >
              {drink.strCategory}
            </button>
          ))
        )}
      </div>
      <button
        type="button"
        onClick={ handleRemoveFilter }
        data-testid="All-category-filter"
      >
        All
      </button>
      <div>
        {history.location.pathname === '/meals' ? (
          meals.map((meal, index) => (
            <button
              key={ index }
              data-testid={ `${index}-recipe-card` }
              onClick={ () => handleCardClick(meal.idMeal, 'meal') }
            >
              <img
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
                data-testid={ `${index}-card-img` }
              />
              <h2 data-testid={ `${index}-card-name` }>{meal.strMeal}</h2>
            </button>
          ))
        ) : (
          drinks.map((drink, index) => (
            <button
              key={ index }
              data-testid={ `${index}-recipe-card` }
              onClick={ () => handleCardClick(drink.idDrink, 'drink') }
            >
              <img
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
                data-testid={ `${index}-card-img` }
              />
              <h2 data-testid={ `${index}-card-name` }>{drink.strDrink}</h2>
            </button>
          ))
        )}
      </div>
    </>
  );
}

export default Recipes;
