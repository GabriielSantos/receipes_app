import React, { useContext, useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import blackHeartIcon from '../style/imgs/liked.svg';
import whiteHeartIcon from '../style/imgs/toLike.svg';
import shareIcon from '../style/imgs/share.svg';
import allToFav from '../style/imgs/allToFav.svg';
import mealToFav from '../style/imgs/mealToFav.svg';
import drinkToFav from '../style/imgs/drinkToFav.svg';
import '../style/favoriteRecipes.css';

export default function FavoriteRecipes() {
  const { filterType, setFilterType } = useContext(RecipesContext);
  const [favoriteRecipes, setfavoriteRecipes] = useState([]);
  const [isFavorite] = useState(false);
  const [verify, setVerify] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  useEffect(() => {
    const storageFavoriteRecipes = JSON.parse(localStorage
      .getItem('favoriteRecipes')) || [];
    setfavoriteRecipes(storageFavoriteRecipes);
  }, [verify]);

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

  const handleFavorite = (name) => {
    const storageFavoriteRecipes = JSON.parse(localStorage
      .getItem('favoriteRecipes')) || [];
    const filterFavoriteRecipes = storageFavoriteRecipes
      .filter((elem) => elem.name !== name);
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(filterFavoriteRecipes),
    );
    setVerify(!verify);
  };

  const handleFilter = (type) => {
    setFilterType(type);
  };

  const filteredRecipes = (filterType === 'all')
    ? favoriteRecipes
    : favoriteRecipes.filter((recipe) => recipe.type === filterType);

  return (
    <div>
      <Header />
      <div className="favCategory">
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
        <div className="favRecipesContainer" key={ recipe.id }>
          <a href={ `/${recipe.type}s/${recipe.id}` }>
            <img
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
            />
          </a>
          <div className="favRecipeBody">
            <a href={ `/${recipe.type}s/${recipe.id}` }>
              <h3 data-testid={ `${index}-horizontal-name` }>
                {recipe.name}
              </h3>
            </a>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {recipe.type === 'drink'
                ? recipe.alcoholicOrNot : `${recipe.nationality} - ${recipe.category}`}
            </p>
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
            <button
              type="button"
              onClick={ () => handleFavorite(recipe.name) }
            >
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ isFavorite ? whiteHeartIcon : blackHeartIcon }
                alt={ isFavorite ? 'Favorite' : 'Not Favorite' }
              />
            </button>
            {selectedCardIndex === index
              && <p id="alert" />}
          </div>
        </div>
      ))}
    </div>
  );
}
