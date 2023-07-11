import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import RecipesContext from '../context/RecipesContext';
import Profile from '../pages/Profile';

test('Profile component', () => {
  const history = createMemoryHistory();
  const setAppState = jest.fn();

  const user = {
    email: 'test@example.com',
  };

  render(
    <Router history={ history }>
      <RecipesContext.Provider value={ { appState: { user }, setAppState } }>
        <Profile />
      </RecipesContext.Provider>
    </Router>,
  );

  const emailElement = screen.getByTestId('profile-email');
  const doneRecipesButton = screen.getByTestId('profile-done-btn');
  const favoriteRecipesButton = screen.getByTestId('profile-favorite-btn');
  const logoutButton = screen.getByTestId('profile-logout-btn');

  expect(emailElement.textContent).toBe(user.email);

  fireEvent.click(doneRecipesButton);
  expect(history.location.pathname).toBe('/done-recipes');

  fireEvent.click(favoriteRecipesButton);
  expect(history.location.pathname).toBe('/favorite-recipes');

  fireEvent.click(logoutButton);
  expect(localStorage.clear).toHaveBeenCalledTimes(1);
  expect(setAppState).toHaveBeenCalledWith({ user: { email: '' } });
  expect(history.location.pathname).toBe('/');
});
