import React, { useState } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const [filter, setFilter] = useState('');

  const handleShareRecipe = (recipeId) => {
    console.log('Share recipe:', recipeId);
  };

  const handleFilter = (type) => {
    setFilter(type);
  };

  const filteredRecipes = filter
    ? doneRecipes.filter((recipe) => recipe.type === filter)
    : doneRecipes;

  return (
    <div>
      <div>
        <Header />
      </div>
      {filteredRecipes.map((recipe, index) => (
        <div key={ index }>
          <img
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={ `${index}-horizontal-image` }
          />
          <p data-testid={ `${index}-horizontal-top-text` }>
            {`${recipe.strArea ? recipe.strArea : ''} - ${
              recipe.strCategory ? recipe.strCategory : ''
            }`}
          </p>
          <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          <button
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ () => handleShareRecipe(recipe.id) }
          >
            <img src={ shareIcon } alt="Share" />
          </button>
          {recipe.tags.slice(0, 2).map((tag, tagIndex) => (
            <span
              key={ tagIndex }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </span>
          ))}
        </div>
      ))}
      <button
        data-testid="filter-by-all-btn"
        onClick={ () => handleFilter('') }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => handleFilter('meal') }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => handleFilter('drink') }
      >
        Drinks
      </button>
    </div>
  );
}

export default DoneRecipes;
