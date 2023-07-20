import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import RecipesContext from '../context/RecipesContext';
import { getSearchBar } from '../services/apiSearch';
import '../style/searchBar.css';

function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const [searchType, setSearchType] = useState('');
  const route = useHistory();
  const { setData, setIsSearch } = useContext(RecipesContext);

  const handleClickSearch = async () => {
    const routeSearch = route.location.pathname;

    if (searchType === 'First Letter' && searchInput.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }

    try {
      const responseAPI = await getSearchBar(searchInput, searchType, routeSearch);
      setData(responseAPI);
      setIsSearch(true);
    } catch (error) {
      global.alert('Falha na Requisição a API ');
    }
  };

  return (
    <div
      className="searchContainer"
      data-testid="search-content"
      style={ { display: 'none' } }
    >
      <input
        className="searchInput"
        type="text"
        data-testid="search-input"
        name="search"
        placeholder="Buscar Receita"
        value={ searchInput }
        onChange={ ({ target }) => setSearchInput(target.value) }
      />
      <div className="radioButtons">
        <label>
          <input
            type="radio"
            name="search"
            data-testid="ingredient-search-radio"
            value="Ingredient"
            onChange={ ({ target }) => setSearchType(target.value) }
          />
          <span>Ingredient</span>
        </label>
        <label>
          <input
            type="radio"
            name="search"
            data-testid="name-search-radio"
            value="Name"
            onChange={ ({ target }) => setSearchType(target.value) }
          />
          <span>Name</span>
        </label>
        <label>
          <input
            type="radio"
            name="search"
            data-testid="first-letter-search-radio"
            value="First Letter"
            onChange={ ({ target }) => setSearchType(target.value) }
          />
          <span>First Letter</span>
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClickSearch }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
