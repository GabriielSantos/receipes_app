import React from 'react';

function SearchBar() {
  return (
    <div data-testid="search-content" style={ { display: 'none' } }>
      <input
        type="text"
        data-testid="search-input"
        name="search"
        placeholder="Buscar Receita"
      />
      <br />
      <label>
        <input type="radio" name="search" data-testid="ingredient-search-radio" />
        Ingredient
      </label>
      <label>
        <input type="radio" name="search" data-testid="name-search-radio" />
        Name
      </label>
      <label>
        <input type="radio" name="search" data-testid="first-letter-search-radio" />
        First Letter
      </label>
      <br />
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
