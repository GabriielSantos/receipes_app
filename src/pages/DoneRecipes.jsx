import React, { useEffect, useState, useContext } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import RecipesContext from '../context/RecipesContext';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const { filterType, setFilterType } = useContext(RecipesContext);

  useEffect(() => {
    const storedDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setDoneRecipes(storedDoneRecipes);
  }, []);

  const handleShareButton = (recipe) => {
    const url = `http://localhost:3000/${recipe.type}s/${recipe.id}`;
    navigator.clipboard.writeText(url);
    const copyLink = document.createElement('p');
    copyLink.innerHTML = 'Link copied!';
    document.getElementById('divDoneRecipes').appendChild(copyLink);
  };

  const handleFilter = (type) => {
    setFilterType(type);
  };

  const filteredRecipes = filterType === 'all'
    ? doneRecipes
    : doneRecipes.filter((recipe) => recipe.type === filterType);

  return (
    <div>
      <Header />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => handleFilter('all') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ () => handleFilter('meal') }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => handleFilter('drink') }
      >
        Drinks
      </button>

      {filteredRecipes.map((recipe, index) => (
        <div id="divDoneRecipes" key={ recipe.id }>
          <a href={ `/${recipe.type}s/${recipe.id}` }>
            <img
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
            />
          </a>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipe.type === 'drink'
              ? recipe.alcoholicOrNot : `${recipe.nationality} - ${recipe.category}`}
          </p>
          <a href={ `/${recipe.type}s/${recipe.id}` }>
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          </a>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          {recipe.tags.slice(0, 2).map((tag, tagIndex) => (
            <span key={ tagIndex } data-testid={ `${index}-${tag}-horizontal-tag` }>
              {tag}
            </span>
          ))}
          <button
            type="button"
            onClick={ () => handleShareButton(recipe) }
          >
            <img
              src={ shareIcon }
              alt=""
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;
