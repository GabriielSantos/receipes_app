import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';

describe('testing the Recipes page', () => {
  it('should have cards with the recipes', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      '/meals',
    );

    await waitFor(() => {
      const card = screen.getByTestId('0-recipe-card');
      expect(card).toBeInTheDocument();
    });
  });

  it('should have a category filter', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      '/meals',
    );

    await waitFor(() => {
      const filter = screen.getByTestId('All-category-filter');
      expect(filter).toBeInTheDocument();
    });
  });

  it('test if the filter works', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      '/meals',
    );

    await waitFor(() => {
      const beefButton = screen.getByTestId('Beef-category-filter');
      const sushiCard = screen.getByAltText('Sushi');
      expect(sushiCard).toBeInTheDocument();
      expect(beefButton).toBeInTheDocument();
      waitFor(() => {
        act(() => {
          userEvent.click(beefButton);
          expect(sushiCard).not.toBeInTheDocument();
        });
      });
    });
  });
});
