import React, { useEffect, useState, useContext } from 'react';
import { getDrinksByCategory, getMealsByCategory } from '../services/api';
import { fetchDrinks, fetchDrinksByCategory } from '../services/fetchDrinks';
import { fetchMeals, fetchMealsByCategory } from '../services/fetchMeals';
import RecipesContext from '../context/RecipesContext';
import '../style/Recipes.css';

// Icones de filtros por categoria de comida
import allMealsIcon from '../style/imgs/allMealsIcon.svg';
import beefIcon from '../style/imgs/beefIcon.svg';
import breakIcon from '../style/imgs/breakIcon.svg';
import chickenIcon from '../style/imgs/chickenIcon.svg';
import dessertIcon from '../style/imgs/dessertIcon.svg';
import goatIcon from '../style/imgs/goatIcon.svg';

// Icones de filtros por categoria de bebida
import allDrinksIcon from '../style/imgs/allDrinksIcon.svg';
import cocktailIcon from '../style/imgs/cocktailIcon.svg';
import cocoaIcon from '../style/imgs/cocoaIcon.svg';
import drinkIcon from '../style/imgs/drinkIcon.svg';
import otherIcon from '../style/imgs/otherIcon.svg';
import shakeIcon from '../style/imgs/shakeIcon.svg';

function Recipes() {
  const {
    handleCardClick,
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

  const getMealsImage = (meal) => {
    switch (meal.strCategory) {
    case 'Beef':
      return beefIcon;
    case 'Breakfast':
      return breakIcon;
    case 'Chicken':
      return chickenIcon;
    case 'Dessert':
      return dessertIcon;
    case 'Goat':
      return goatIcon;
    default:
    }
  };

  const getDrinksImage = (drink) => {
    switch (drink.strCategory) {
    case 'Cocktail':
      return cocktailIcon;
    case 'Cocoa':
      return cocoaIcon;
    case 'Ordinary Drink':
      return drinkIcon;
    case 'Other / Unknown':
      return otherIcon;
    case 'Shake':
      return shakeIcon;
    default:
    }
  };

  return (
    <>
      <div className="categoryContainer">
        <button
          type="button"
          onClick={ handleRemoveFilter }
          data-testid="All-category-filter"
        >
          {
            route.location.pathname === '/meals'
              ? <img src={ allMealsIcon } alt="all meals" />
              : <img src={ allDrinksIcon } alt="all drinks" />
          }
        </button>
        {route.location.pathname === '/meals' ? (
          newMealsByCategory.map((meal, index) => (
            <button
              key={ index }
              type="button"
              data-testid={ `${meal.strCategory}-category-filter` }
              onClick={ () => handleCategoryFilter(meal.strCategory) }
            >
              <img src={ getMealsImage(meal) } alt={ meal.strCategory } />
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
              <img src={ getDrinksImage(drink) } alt={ drink.strCategory } />
            </button>
          ))
        )}
      </div>
      <div className="recipesContainer">
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
              <h3 data-testid={ `${index}-card-name` }>{meal.strMeal}</h3>
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
              <h3 data-testid={ `${index}-card-name` }>{drink.strDrink}</h3>
            </button>
          ))
        )}
      </div>
    </>
  );
}

export default Recipes;
