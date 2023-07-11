import { render, screen, fireEvent } from '@testing-library/react';
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
    const searchInput = screen.getByTestId('search-input');
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
