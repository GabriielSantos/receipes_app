// RecipesProvider.js
import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [appState, setAppState] = useState({ user: { email: 'email@mail.com' } });

  const contextValue = useMemo(
    () => ({ appState, setAppState }),
    [appState, setAppState],
  );

  return (
    <RecipesContext.Provider value={ contextValue }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
