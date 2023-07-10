import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testes da página de Login', () => {
  test('Verifica se os inputs existem e se é validado corretamente o email e senha', () => {
    const { history } = renderWithRouter(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const btnLogin = screen.getByTestId('login-submit-btn');
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(btnLogin).toBeInTheDocument();

    expect(btnLogin).toBeDisabled();

    userEvent.type(inputEmail, 'testes@teste.com');

    expect(btnLogin).toBeDisabled();

    userEvent.type(inputPassword, '1234567');

    expect(btnLogin).toBeEnabled();

    userEvent.click(btnLogin);

    const {
      location: { pathname },
    } = history;

    expect(pathname).toBe('/meals');
  });
});
