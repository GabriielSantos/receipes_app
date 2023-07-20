import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import profileIconY from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import logoRecipes from '../style/imgs/logoRecipesP.svg';
import iconMeals from '../style/imgs/iconMeals.svg';
import iconDrinks from '../style/imgs/iconDrinks.svg';
import profileIcon from '../style/imgs/perfilIcon.svg';
import doneIcon from '../style/imgs/doneIcon.svg';
import favoriteIcon from '../style/imgs/favoritesIcon.svg';
import '../style/Header.css';

export default function Header() {
  const location = useLocation();
  const history = useHistory();

  const getImage = () => {
    switch (location.pathname) {
    case '/meals':
      return iconMeals;
    case '/drinks':
      return iconDrinks;
    case '/profile':
      return profileIcon;
    case '/done-recipes':
      return doneIcon;
    case '/favorite-recipes':
      return favoriteIcon;
    default:
      return '';
    }
  };

  const getTitle = () => {
    switch (location.pathname) {
    case '/meals':
      return 'Meals';
    case '/drinks':
      return 'Drinks';
    case '/profile':
      return 'Profile';
    case '/done-recipes':
      return 'Done Recipes';
    case '/favorite-recipes':
      return 'Favorite Recipes';
    default:
      return '';
    }
  };
  const handleProfileClick = () => {
    history.push('/profile');
  };

  const showSearchIcon = ['/meals', '/drinks'].includes(location.pathname);

  const handleSearchClick = () => {
    const searchInput = document.querySelector('input');
    const searchContent = document.querySelector('[data-testid="search-content"]');

    if (searchContent.style.display === 'none') {
      searchContent.style.display = 'block';
      searchInput.dataset.testid = 'search-input';
    } else {
      searchContent.style.display = 'none';
      searchInput.dataset.testid = '';
    }
  };

  return (
    <>
      <div className="headerContainer">
        <div className="yellowContainer">
          <img
            src={ logoRecipes }
            alt="logo"
            className="logoRecipesP"
          />
          <h1 className="teste">
            RECIPES
            <span>app</span>
          </h1>
          <a
            href="/profile"
            onClick={ handleProfileClick }
          >
            <img
              className={ showSearchIcon ? 'profileIcon' : 'profileIcon2' }
              alt="Ícone de Perfil"
              src={ profileIconY }
              data-testid="profile-top-btn"
            />
          </a>
          {showSearchIcon && (
            <button
              onClick={ handleSearchClick }
              className="searchIcon"
            >
              <img
                alt="Ícone de Pesquisa"
                src={ searchIcon }
                data-testid="search-top-btn"
              />
            </button>
          )}
        </div>
        <div className="whiteContainer">
          <img
            src={ getImage() }
            alt="Ícone da página"
            className="iconMeals"
          />
          <h1 data-testid="page-title">{getTitle()}</h1>
        </div>
      </div>
      <SearchBar />
    </>
  );
}
