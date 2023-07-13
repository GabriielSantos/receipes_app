import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
import DoneRecipes from './pages/DoneRecipes';
import Drinks from './pages/Drinks';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Profile from './pages/Profile';
import RecipesDetailsMeals from './pages/RecipesDetailsMeals';
import RecipesDetailsDrinks from './pages/RecipesDetailsDrinks';
import RecipesContext from './context/RecipesContext';

function App() {
  const { idSelected } = useContext(RecipesContext);

  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Meals } />
      <Route
        exact
        path={ `/meals/${idSelected.id}` }
        component={ RecipesDetailsMeals }
      />
      <Route exact path="/meals/:id-da-receita/in-progress" />
      <Route exact path="/drinks" component={ Drinks } />
      <Route
        exact
        path={ `/drinks/${idSelected.id}` }
        component={ RecipesDetailsDrinks }
      />
      <Route exact path="/drinks/:id-da-receita/in-progress" />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default App;
