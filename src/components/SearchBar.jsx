import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { getSearchBar } from '../services/apiSearch';

function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const [searchType, setSearchType] = useState('');
  const route = useHistory();

  const handleClickSearch = () => {
    const routeSearch = route.location.pathname;

    if (searchType === 'First Letter' && searchInput.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    getSearchBar(searchInput, searchType, routeSearch);
  };

  return (
    <div data-testid="search-content" style={ { display: 'none' } }>
      <input
        type="text"
        data-testid="search-input"
        name="search"
        placeholder="Buscar Receita"
        value={ searchInput }
        onChange={ ({ target }) => setSearchInput(target.value) }
      />
      <br />
      <label>
        <input
          type="radio"
          name="search"
          data-testid="ingredient-search-radio"
          value="Ingredient"
          onChange={ ({ target }) => setSearchType(target.value) }
        />
        Ingredient
      </label>
      <label>
        <input
          type="radio"
          name="search"
          data-testid="name-search-radio"
          value="Name"
          onChange={ ({ target }) => setSearchType(target.value) }
        />
        Name
      </label>
      <label>
        <input
          type="radio"
          name="search"
          data-testid="first-letter-search-radio"
          value="First Letter"
          onChange={ ({ target }) => setSearchType(target.value) }
        />
        First Letter
      </label>
      <br />
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClickSearch }
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
