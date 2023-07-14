import React, { useEffect, useState, useContext } from 'react';
import { getDrinksByCategory, getMealsByCategory } from '../services/api';
import { fetchDrinks, fetchDrinksByCategory } from '../services/fetchDrinks';
import { fetchMeals, fetchMealsByCategory } from '../services/fetchMeals';
import RecipesContext from '../context/RecipesContext';

function Recipes() {
  const {
    setId,
    route,
    newDrinks,
    newMeals } = useContext(RecipesContext);

  const [meals, setMealsByFilter] = useState([]);
  const [drinks, setDrinksByFilter] = useState([]);
  const [newMealsByCategory, setNewMealsByCategory] = useState([]);
  const [newDrinksByCategory, setNewDrinksByCategory] = useState([]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchMeals().then((data) => {
      setMealsByFilter(data);
    });
    fetchDrinks().then((data) => {
      setDrinksByFilter(data);
    });
    fetchMealsByCategory().then((data) => setNewMealsByCategory(data));
    fetchDrinksByCategory().then((data) => setNewDrinksByCategory(data));
  }, []);

  useEffect(() => {
    const twelve = 12;
    if (category !== '') {
      if (route.location.pathname === '/meals') {
        getMealsByCategory(category)
          .then((data) => {
            const filteredMeals = data.filter((_, index) => index < twelve);
            setMealsByFilter(filteredMeals);
          });
      } else if (route.location.pathname === '/drinks') {
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
  }, [category, route.location.pathname, newDrinks, newMeals]);

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

  const handleCardClick = (id) => {
    const currentPath = route.location.pathname;
    if (currentPath === '/meals') {
      route.push(`/meals/${id}`);
    } else if (currentPath === '/drinks') {
      route.push(`/drinks/${id}`);
    }
    setId(id);
  };

  return (
    <>
      <div>
        {route.location.pathname === '/meals' ? (
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
        {route.location.pathname === '/meals' ? (
          meals.map((meal, index) => (
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
          ))
        ) : (
          drinks.map((drink, index) => (
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
        )}
      </div>
    </>
  );
}

export default Recipes;
