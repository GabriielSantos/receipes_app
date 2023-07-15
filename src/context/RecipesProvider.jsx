// RecipesProvider.js
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from './RecipesContext';
import { fetchDrinks } from '../services/fetchDrinks';
import { fetchMeals } from '../services/fetchMeals';

function RecipesProvider({ children }) {
  const [appState, setAppState] = useState({ user: { email: 'email@mail.com' } });
  const [idsSearched, setIdsSearched] = useState([]);
  const [idSelected, setIdSelected] = useState([]);
  const [data, setData] = useState([]);
  const [id, setId] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [newMeals, setNewMeals] = useState([]);
  const [newDrinks, setNewDrinks] = useState([]);
  const route = useHistory();

  useEffect(() => {
    if (data?.meals?.length === 1) {
      setIdsSearched(data);
      route.push(`/meals/${data.meals[0].idMeal}`);
    }
    if (data?.drinks?.length === 1) {
      setIdsSearched(data);
      route.push(`/drinks/${data.drinks[0].idDrink}`);
    }
    if (data?.meals === null || data?.drinks === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [data, idsSearched, route]);

  useEffect(() => {
    fetchDrinks().then((items) => setNewDrinks(items));
    fetchMeals().then((items) => setNewMeals(items));
  }, []);

  const handleCardClick = (elem) => {
    const currentPath = route.location.pathname;
    if (currentPath === '/meals') {
      route.push(`/meals/${elem}`);
    } else if (currentPath === '/drinks') {
      route.push(`/drinks/${elem}`);
    }
    setId(elem);
  };

  const contextValue = useMemo(
    () => ({
      handleCardClick,
      appState,
      setAppState,
      idsSearched,
      setIdsSearched,
      data,
      setData,
      isSearch,
      setIsSearch,
      idSelected,
      setIdSelected,
      newMeals,
      setNewMeals,
      newDrinks,
      setNewDrinks,
      route,
      id,
    }),
    [
      handleCardClick,
      appState,
      newDrinks,
      setNewDrinks,
      newMeals,
      setNewMeals,
      setAppState,
      setIsSearch,
      idSelected,
      setIdSelected,
      isSearch,
      data,
      idsSearched,
      id,
      route],
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
