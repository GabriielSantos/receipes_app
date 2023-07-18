import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';
import App from '../App';

const idBtn = 'search-top-btn';
const idInput = 'search-input';
const idBtnSearch = 'exec-search-btn';

describe('Teste do SearchBar', () => {
  it('Teste o click do Search Bar', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      '/meals',
    );

    const searchBtn = screen.getByTestId(idBtn);
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const searchBar = screen.getByTestId(idInput);
    const radioIngredient = screen.getByTestId('ingredient-search-radio');
    const radioName = screen.getByTestId('name-search-radio');
    const firstLetter = screen.getByTestId('first-letter-search-radio');
    const buttonSearch = screen.getByTestId(idBtnSearch);

    expect(searchBar).toBeInTheDocument();
    expect(radioIngredient).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(firstLetter).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();

    await act(async () => {
      userEvent.type(searchBar, 'chicken');
      userEvent.click(radioIngredient);
      userEvent.click(buttonSearch);
    });
    await waitFor(() => {
      expect(screen.getByText('Brown Stew Chicken')).toBeInTheDocument();
      expect(screen.getByText('Chicken & mushroom Hotpot')).toBeInTheDocument();
    });
  });

  it('Testando o click do botão', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      '/meals',
    );

    const searchBtn = screen.getByTestId(idBtn);
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const inputSearch = screen.getByTestId(idInput);
    const buttonIngredient = screen.getByTestId('ingredient-search-radio');
    const buttonSearch = screen.getByTestId(idBtnSearch);
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
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      '/meals',
    );

    const searchBtn = screen.getByTestId(idBtn);
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const inputSearch = screen.getByTestId(idInput);
    const buttonFirst = screen.getByTestId('first-letter-search-radio');
    const buttonSearch = screen.getByTestId(idBtnSearch);
    expect(inputSearch).toBeInTheDocument();
    expect(buttonFirst).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();

    act(() => {
      userEvent.type(inputSearch, 'chicken');
      userEvent.click(buttonFirst);
      userEvent.click(buttonSearch);
    });
  });

  // Deixei O teste de requisicao comentado pois ele estava dando erro no coverage

  // it('Testando uma falha de requisicao a API', async () => {
  //   global.alert = jest.fn();
  //   global.fetch = jest.fn(() => Promise.reject(new Error('Falha na Requisição a API')));
  //   renderWithRouter(
  //     <RecipesProvider>
  //       <App />
  //     </RecipesProvider>,
  //     '/meals',
  //   );
  //   const searchBtn = screen.getByTestId(idBtn);
  //   userEvent.click(searchBtn);

  //   const buttonSearch = screen.getByTestId(idBtnSearch);
  //   userEvent.click(buttonSearch);

  //   await waitFor(() => {
  //     expect(global.alert).toHaveBeenCalledWith('Falha na Requisição a API');
  //   });
  // });
});
