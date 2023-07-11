/* import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Header from '../components/Header';

describe('Teste do Header', () => {
  it('Deve renderizar corretamente o Header com diferentes títulos', () => {
    const history = createMemoryHistory();
    history.push('/meals');

    render(
      <Router history={ history }>
        <Header />
      </Router>,
    );

    const mealsPageTitle = screen.getByTestId('page-title');
    expect(mealsPageTitle).toBeInTheDocument();
    expect(mealsPageTitle).toHaveTextContent('Meals');

    history.push('/drinks');
    const drinksPageTitle = screen.getByTestId('page-title');
    expect(drinksPageTitle).toBeInTheDocument();
    expect(drinksPageTitle).toHaveTextContent('Drinks');
  });

  it('Deve exibir o ícone de perfil e navegar para a página de perfil ao clicar nele', () => {
    const history = createMemoryHistory();
    history.push('/meals');

    render(
      <Router history={ history }>
        <Header />
      </Router>,
    );

    const profileTopBtn = screen.getByTestId('profile-top-btn');
    expect(profileTopBtn).toBeInTheDocument();

    fireEvent.click(profileTopBtn);
    expect(history.location.pathname).toBe('/profile');
  });

  it('Deve exibir o ícone de pesquisa apenas nas páginas de Meals e Drinks', () => {
    const history = createMemoryHistory();
    history.push('/meals');

    render(
      <Router history={ history }>
        <Header />
      </Router>,
    );

    const searchTopBtn = screen.queryByTestId('search-top-btn');
    expect(searchTopBtn).toBeInTheDocument();

    history.push('/profile');
    expect(screen.queryByTestId('search-top-btn')).toBeNull();

    history.push('/done-recipes');
    expect(screen.queryByTestId('search-top-btn')).toBeNull();
  });

  it('Deve exibir e ocultar corretamente o campo de busca ao clicar no ícone de pesquisa', () => {
    const history = createMemoryHistory();
    history.push('/meals');

    render(
      <Router history={ history }>
        <Header />
      </Router>,
    );

    const searchTopBtn = screen.queryByTestId('search-top-btn');
    expect(searchTopBtn).toBeInTheDocument();

    fireEvent.click(searchTopBtn);
    const searchInput = screen.getByTestId('search,input');
    expect(searchInput).toBeInTheDocument();

    fireEvent.click(searchTopBtn);
    expect(screen.queryByTestId('search-input')).toBeNull();
  });

  it('Deve exibir um título vazio quando nenhum título for fornecido', () => {
    const history = createMemoryHistory();
    history.push('/meals');

    render(
      <Router history={ history }>
        <Header />
      </Router>,
    );

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toBeEmptyDOMElement();
  });

  it('Deve renderizar corretamente o campo de busca quando clicar no ícone de pesquisa', () => {
    const history = createMemoryHistory();
    history.push('/meals');

    render(
      <Router history={ history }>
        <Header />
      </Router>,
    );

    const searchTopBtn = screen.queryByTestId('search-top-btn');
    expect(searchTopBtn).toBeInTheDocument();

    fireEvent.click(searchTopBtn);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveStyle('display: block');
  });

  it('Deve renderizar corretamente o Header em uma rota inexistente', () => {
    const history = createMemoryHistory();
    history.push('/rota-inexistente');

    render(
      <Router history={ history }>
        <Header />
      </Router>,
    );

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toBeEmptyDOMElement();
  });
});
 */
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import Header from '../components/Header';

describe('Testa o componente Header', () => {
  it('Testa se o componente Header funciona como esperado na página de Meals', () => {
    const { history } = renderWithRouter(<Header />, { initialEntries: ['/meals'] });

    const mealsPageTitle = screen.getByTestId('page-title');
    const searchTopBtn = screen.getByTestId('search-top-btn');
    const profileTopBtn = screen.getByTestId('profile-top-btn');
    expect(mealsPageTitle).toBeInTheDocument();
    expect(mealsPageTitle.innerHTML).toBe('Meals');
    expect(searchTopBtn).toBeInTheDocument();
    expect(profileTopBtn).toBeInTheDocument();
    userEvent.click(profileTopBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });

  it('Testa se o componente Header renderiza na página de Drinks', () => {
    renderWithRouter(<Header />, { initialEntries: ['/drinks'] });

    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByText('Drinks')).toBeInTheDocument();
  });

  it('Testa se o componente Header renderiza na página de Done Recipes', () => {
    renderWithRouter(<Header />, { initialEntries: ['/done-recipes'] });

    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByText('Done Recipes')).toBeInTheDocument();
  });

  it('Testa se o componente Header renderiza na página de Favorite Recipes', () => {
    renderWithRouter(<Header />, { initialEntries: ['/favorite-recipes'] });

    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByText('Favorite Recipes')).toBeInTheDocument();
  });

  it('Testa se o componente Header renderiza na página de Profile', () => {
    renderWithRouter(<Header />, { initialEntries: ['/profile'] });

    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('Testa se o título do Header é vazio em uma rota inexistente', () => {
    renderWithRouter(<Header />, { initialEntries: ['/rota-inexistente'] });

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle.innerHTML).toBe('');
  });

  it('Testa se o botão de busca funciona como esperado', () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const searchTopBtn = screen.getByTestId('search-top-btn');
    const searchInput = screen.getByTestId('search-input');

    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveStyle('display: none');

    userEvent.click(searchTopBtn);
    expect(searchInput).toHaveStyle('display: block');

    userEvent.click(searchTopBtn);
    expect(searchInput).toHaveStyle('display: none');
  });
});
