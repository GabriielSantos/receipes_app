import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import RecipesFilterFailure from './RecipesFilterFailure';
import RecipesFilterSuccess from './RecipesFilterSucces';

function RecipesCard() {
  const { data } = useContext(RecipesContext);
  return (
    <div>
      {
        ((data?.meals === null || data?.drinks === null))
          ? <RecipesFilterFailure /> : <RecipesFilterSuccess />
      }
    </div>
  );
}

export default RecipesCard;
