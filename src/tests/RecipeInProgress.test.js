import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import drinks from '../../cypress/mocks/drinks';
import App from '../App';
import RecipeInProgress from '../pages/RecipeInProgress';
import renderWithRouter from './helpers/renderWithRouter';

const decorationOfItem = 'text-decoration: line-through solid rgb(0, 0, 0)';
const recipeTitle = 'recipe-title';
const DRINKS = '/drinks/178319/in-progress';
const MEALS = '/meals/52771/in-progress';

describe('Verifica a página RecipeInProgress', () => {
  beforeEach(async () => {
    renderWithRouter(<App />, { initialEntries: [MEALS] });
    await waitFor(() => expect(screen.getByTestId(recipeTitle)).toBeInTheDocument());
  });

  it('É verificado se os elementos são renderizados corretamente para alimentos no RecipeInProgress', () => {
    expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
  });
});

it('É verificado se são renderizados corretamentos as bebidas no RecipeInProgress', async () => {
  renderWithRouter(<RecipeInProgress />, { initialEntries: [DRINKS] });
  await waitFor(() => expect(screen.getByTestId('recipe-title')).toBeInTheDocument());

  const picRecipe = screen.getByTestId('recipe-photo');
  expect(picRecipe).toBeInTheDocument();

  const catRecipe = screen.getByTestId('recipe-category');
  expect(catRecipe).toBeInTheDocument();

  const instructions = screen.getByTestId('instructions');
  expect(instructions).toBeInTheDocument();
});

describe('handleFinish', () => {
  it('Verifica se o redirecionamento para a página de receitas prontas acontece corretamente ao clicar no botão de Finalizar a receita', async () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(drinks),
    }));
    render(
      <BrowserRouter>
        <RecipeInProgress
          checkedIngredients={ [1, 2, 3] }
          renderIngredients={ () => [1, 2, 3] }
        />
      </BrowserRouter>,
    );
    await waitFor(() => expect(screen.getByTestId(recipeTitle)).toBeInTheDocument());

    const doneBtn = screen.getByTestId('finish-recipe-btn');
    expect(doneBtn).toBeInTheDocument();
    fireEvent.click(doneBtn);

    const { pathname } = window.location;
    expect(pathname).toBe('/done-recipes');
  });

  it('Verifica se o botão Finalizar Receita está ativo se todos os ingredientes estiverem marcados', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(drinks),
    }));
    renderWithRouter(
      <RecipeInProgress
        checkedIngredients={ [1, 2, 3] }
        renderIngredients={ () => [1, 2, 3] }
      />,
    );

    const doneBtn = screen.getByTestId('finish-recipe-btn');
    expect(doneBtn).toBeEnabled();
  });

  it('É verificado se a adição e remoção de ingredientes funciona no RecipeInProgress', async () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(MEALS),
    }));

    renderWithRouter(<App />, { initialEntries: [MEALS] });

    await waitFor(() => expect(screen.getByTestId(recipeTitle)).toBeInTheDocument());

    const item1 = await screen.findByTestId('0-ingredient-step');
    const item2 = await screen.findByTestId('1-ingredient-step');

    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();

    fireEvent.click(item1);

    expect(item1).toHaveStyle(decorationOfItem);
    expect(item2).not.toHaveStyle(decorationOfItem);

    fireEvent.click(item1);
    expect(item1).not.toHaveStyle(decorationOfItem);
  });

  it('É verificado se o texto "Link copied!" é renderizado após clicar no botão de compartilhar', async () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(drinks),
    }));

    global.navigator.clipboard = {
      writeText: jest.fn(),
    };

    renderWithRouter(<RecipeInProgress />, { initialEntries: [DRINKS] });

    await waitFor(() => expect(screen.getByTestId(recipeTitle)).toBeInTheDocument());

    const shareBtn = screen.getByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();
    fireEvent.click(shareBtn);

    await waitFor(() => expect(screen.getByText(/link copied!/i)).toBeInTheDocument());
  });

  it('É verificado se o ícone correto é renderizado após clicar no botão de favoritar', async () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(drinks),
    }));

    renderWithRouter(<RecipeInProgress
      isFavorite={ false }
      blackHeartIcon="black-heart-icon.png"
      whiteHeartIcon="white-heart-icon.png"
    />, { initialEntries: [DRINKS] });

    await waitFor(() => expect(screen.getByTestId(recipeTitle)).toBeInTheDocument());

    const blackHeartIcon = screen.queryByAltText('Favorito');
    const whiteHeartIcon = screen.getByAltText('Não favorito');

    expect(blackHeartIcon).not.toBeInTheDocument();
    expect(whiteHeartIcon).toBeInTheDocument();

    const favoriteButton = screen.getByTestId('favorite-btn');
    expect(favoriteButton).toBeInTheDocument();
    fireEvent.click(favoriteButton);

    await waitFor(() => expect(screen.queryByAltText('Favorito')).toBeInTheDocument());
  });
});
