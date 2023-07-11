import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Header from '../components/Header';

const idBtn = 'search-top-btn';
describe('Teste do SearchBar', () => {
  it('Teste o click do Search Bar', () => {
    const history = createMemoryHistory();
    history.push('/meals');

    render(
      <Router history={ history }>
        <Header />
      </Router>,
    );
    const searchBtn = screen.getByTestId(idBtn);
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const searchBar = screen.getByTestId('search-input');
    const radioIngredient = screen.getByRole('radio', { name: /ingrediente/i });
    const radioName = screen.getByRole('radio', { name: /nome/i });
    const firstLetter = screen.getByRole('radio', { name: /primeira letra/i });
    const buttonSearch = screen.getByRole('button', { name: /buscar/i });

    expect(searchBar).toBeInTheDocument();
    expect(radioIngredient).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(firstLetter).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();

    userEvent.click(searchBtn);

    expect(searchBar).not.toBeInTheDocument();
    expect(radioIngredient).not.toBeInTheDocument();
    expect(radioName).not.toBeInTheDocument();
    expect(firstLetter).not.toBeInTheDocument();
    expect(buttonSearch).not.toBeInTheDocument();
  });

  it('Testando o click do botão', async () => {
    const history = createMemoryHistory();
    history.push('/meals');
    render(
      <Router history={ history }>
        <Header />
      </Router>,
    );

    const searchBtn = screen.getByTestId(idBtn);
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const inputSearch = screen.getByRole('textbox');
    const buttonIngredient = screen.getByRole('radio', { name: /ingrediente/i });
    const buttonSearch = screen.getByRole('button', { name: /buscar/i });
    expect(inputSearch).toBeInTheDocument();
    expect(buttonIngredient).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();

    act(() => {
      userEvent.type(inputSearch, 'chicken');
      userEvent.click(buttonIngredient);
      userEvent.click(buttonSearch);
    });
  });

  it('Testando o click do botão com uma letra a mais no input', async () => {
    const history = createMemoryHistory();
    history.push('/meals');
    render(
      <Router history={ history }>
        <Header />
      </Router>,
    );

    const searchBtn = screen.getByTestId(idBtn);
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const inputSearch = screen.getByRole('textbox');
    const buttonFirst = screen.getByRole('radio', { name: /primeira letra/i });
    const buttonSearch = screen.getByRole('button', { name: /buscar/i });
    expect(inputSearch).toBeInTheDocument();
    expect(buttonFirst).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();

    act(() => {
      userEvent.type(inputSearch, 'chicken');
      userEvent.click(buttonFirst);
      userEvent.click(buttonSearch);
    });
  });
});
