import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import RecipesContext from '../context/RecipesContext';
import Button from '../components/Button';
import Header from '../components/Header';

function Profile() {
  const { appState, setAppState } = useContext(RecipesContext);
  const { user } = appState;
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    setAppState({ user: { email: '' } });
    history.push('/');
  };

  const navRoute = (route) => {
    history.push(route);
  };

  return (
    <section className="section-profile">
      <Header />
      <p data-testid="profile-email">{user.email}</p>
      <Button
        dataTestId="profile-done-btn"
        onClick={ () => navRoute('/done-recipes') }
      >
        Done Recipes
      </Button>
      <Button
        dataTestId="profile-favorite-btn"
        onClick={ () => navRoute('/favorite-recipes') }
      >
        Favorite Recipes
      </Button>
      <Button dataTestId="profile-logout-btn" onClick={ handleLogout }>
        Logout
      </Button>
    </section>
  );
}

export default Profile;
