import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import drinks from '../../cypress/mocks/drinks';
import App from '../App';
import RecipeInProgress from '../pages/RecipeInProgress';
import renderWithRouter from './helpers/renderWithRouter';

describe('Verifica a página RecipeInProgress', () => {
  beforeEach(async () => {
    renderWithRouter(<App />, { initialEntries: [MEALS] });
    await waitFor(() => expect(screen.getByTestId(RECIPE_TITLE)).toBeInTheDocument());
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
    await waitFor(() => expect(screen.getByTestId(RECIPE_TITLE)).toBeInTheDocument());

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
});
