import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import RecipesContext from '../context/RecipesContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../style/favoriteRecipes.css';

export default function FavoriteRecipes() {
  const { filterType, setFilterType } = useContext(RecipesContext);
  const [favoriteRecipes, setfavoriteRecipes] = useState([]);
  const [isFavorite] = useState(false);
  const [verifyFavorites, setVerifyFavorites] = useState(false);

  useEffect(() => {
    const storageFavoriteRecipes = JSON.parse(localStorage
      .getItem('favoriteRecipes')) || [];
    setfavoriteRecipes(storageFavoriteRecipes);
  }, []);

  const handleShareButton = (recipe) => {
    const url = `http://localhost:3000/${recipe.type}s/${recipe.id}`;
    navigator.clipboard.writeText(url);
    const copyLink = document.createElement('p');
    copyLink.innerHTML = 'Link copied!';
    document.getElementById('divFavoriteRecipes').appendChild(copyLink);
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
    if (storageFavoriteRecipes.length > 0) {
      setVerifyFavorites(false);
    } else {
      setVerifyFavorites(true);
    }
  };

  useEffect(() => {
    console.log(verifyFavorites);
  }, [verifyFavorites]);

  const handleFilter = (type) => {
    setFilterType(type);
  };

  const filteredRecipes = filterType === 'all'
    ? favoriteRecipes
    : favoriteRecipes.filter((recipe) => recipe.type === filterType);

  // const openRecipe = () => {
  //   route.push(`/${recipe.type}s/${recipe.id}`);
  // };

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
        <div id="divFavoriteRecipes" key={ recipe.id }>
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
            <p
              data-testid={ `${index}-horizontal-name` }
            >
              {recipe.name}
            </p>
          </a>
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
        </div>
      ))}
    </div>
  );
}
