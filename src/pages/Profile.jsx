import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import RecipesContext from '../context/RecipesContext';
import Button from '../components/Button';
import Header from '../components/Header';
import Footer from '../components/Footer';

// import styles
import doneIcon from '../style/imgs/doneIcon.svg';
import favIcon from '../style/imgs/favoritesIcon.svg';
import logoutIcon from '../style/imgs/logout.svg';
import '../style/Profile.css';

function Profile() {
  const { appState, setAppState } = useContext(RecipesContext);
  const { user } = appState;
  const history = useHistory();

  useEffect(() => {
    const userStorage = JSON.parse(localStorage.getItem('user'));
    if (userStorage) {
      setAppState({ user: { email: userStorage.email } });
    }
  }, [setAppState]);

  const handleLogout = () => {
    localStorage.clear();
    setAppState({ user: { email: '' } });
    history.push('/');
  };

  const navRoute = (route) => {
    history.push(route);
  };

  return (
    <section className="sectionProfile">
      <Header />
      <p data-testid="profile-email">{user.email}</p>

      <div className="doneBtnContainer">
        <Button
          dataTestId="profile-done-btn"
          onClick={ () => navRoute('/done-recipes') }
        >
          <img src={ doneIcon } alt="done icon" />
          Done Recipes
        </Button>
      </div>

      <div className="favoriteBtnContainer">
        <Button
          dataTestId="profile-favorite-btn"
          onClick={ () => navRoute('/favorite-recipes') }
        >
          <img src={ favIcon } alt="favorite icon" />
          Favorite Recipes
        </Button>
      </div>

      <div className="logoutBtnContainer">
        <Button dataTestId="profile-logout-btn" onClick={ handleLogout }>
          <img src={ logoutIcon } alt="logout icon" />
          Logout
        </Button>
      </div>
      <Footer />
    </section>
  );
}

export default Profile;
