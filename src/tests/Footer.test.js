import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Footer from '../components/Footer';

describe('Testes do componente Footer', () => {
  const btnDrinks = 'drinks-bottom-btn';
  const btnMeals = 'meals-bottom-btn';

  test('Verifica se os dois botões são renderizados', () => {
    renderWithRouter(<Footer />, '/meals');
    expect(screen.getByTestId(btnDrinks)).toBeInTheDocument();
    expect(screen.getByTestId(btnMeals)).toBeInTheDocument();
  });

  test('Ao clicar no botão Drinks será redirecionado para a página de Drinks', () => {
    const { history } = renderWithRouter(<Footer />, '/meals');
    userEvent.click(screen.getByTestId(btnDrinks));
    expect(history.location.pathname).toBe('/drinks');
  });

  test('Ao clicar no botão Meals será redirecionado para a página de Meals', () => {
    const { history } = renderWithRouter(<Footer />, '/drinks');
    userEvent.click(screen.getByTestId(btnMeals));
    expect(history.location.pathname).toBe('/meals');
  });
});
