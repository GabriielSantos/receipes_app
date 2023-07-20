import React, { useEffect, useState, useContext } from 'react';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../style/imgs/share.svg';
import RecipesContext from '../context/RecipesContext';
import allToFav from '../style/imgs/allToFav.svg';
import mealToFav from '../style/imgs/mealToFav.svg';
import drinkToFav from '../style/imgs/drinkToFav.svg';
import '../style/DoneRecipes.css';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const { filterType, setFilterType } = useContext(RecipesContext);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  useEffect(() => {
    const storedDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setDoneRecipes(storedDoneRecipes);
  }, []);

  const handleShareButton = (recipe, index) => {
    const url = `http://localhost:3000/${recipe.type}s/${recipe.id}`;
    copy(url).then(() => {
      const time = 2000;
      const alert = document.getElementById('alert');
      alert.innerHTML = 'Link copiado!';
      setTimeout(() => {
        alert.innerHTML = '';
      }, time);
    });
    setSelectedCardIndex(index);
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
      <div className="doneCategory">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => handleFilter('all') }
        >
          <img
            src={ allToFav }
            alt="All"
          />
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => handleFilter('meal') }
        >
          <img
            src={ mealToFav }
            alt="Meals"
          />
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => handleFilter('drink') }
        >
          <img
            src={ drinkToFav }
            alt="Drinks"
          />
        </button>
      </div>

      {filteredRecipes.map((recipe, index) => (
        <div className="doneRecipesContainer" key={ recipe.id }>
          <a href={ `/${recipe.type}s/${recipe.id}` }>
            <img
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
            />
          </a>
          <div className="doneRecipeBody">
            <a href={ `/${recipe.type}s/${recipe.id}` }>
              <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
            </a>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {recipe.type === 'drink'
                ? recipe.alcoholicOrNot : `${recipe.nationality} - ${recipe.category}`}
            </p>
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            {recipe.tags.slice(0, 2).map((tag, tagIndex) => (
              <span key={ tagIndex } data-testid={ `${index}-${tag}-horizontal-tag` }>
                {tag}
              </span>
            ))}
            <button
              type="button"
              onClick={ () => handleShareButton(recipe, index) }
            >
              <img
                src={ shareIcon }
                alt=""
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
          </div>
          {selectedCardIndex === index && <p id="alert" />}
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;
