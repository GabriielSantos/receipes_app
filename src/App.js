import React from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
import RecipesProvider from './context/RecipesProvider';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/meals" component={ Meals } />
        <Route path="/meals/:id-da-receita" />
        <Route path="/meals/:id-da-receita/in-progress" />
        <Route path="/drinks" component={ Drinks } />
        <Route path="/drinks/:id-da-receita" />
        <Route path="/drinks/:id-da-receita/in-progress" />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
