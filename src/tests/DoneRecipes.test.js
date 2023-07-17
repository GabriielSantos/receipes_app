import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa a página DoneRecipes', () => {
  localStorage.setItem('doneRecipes', JSON.stringify([
    {
      id: '52977',
      type: 'meal',
      area: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '2023-07-13T18:05:19.646Z',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      area: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '2023-07-13T18:05:19.646Z',
      tags: [],
    },
  ]));
  beforeEach(() => {
    renderWithRouter(<App />, { initialEntries: ['/done-recipes'] });
  });
  it('Testa se a página contém os elementos esperados', () => {
    const filterByAllBtn = screen.getByTestId('filter-by-all-btn');
    const filterByFoodBtn = screen.getByTestId('filter-by-meal-btn');
    const filterByDrinkBtn = screen.getByTestId('filter-by-drink-btn');

    expect(filterByAllBtn).toBeInTheDocument();
    expect(filterByFoodBtn).toBeInTheDocument();
    expect(filterByDrinkBtn).toBeInTheDocument();
  });

  it('Testa se a página contém as receitas feitas', () => {
    const image = screen.getAllByTestId(/-horizontal-image/i);
    const topText = screen.getAllByTestId(/-horizontal-top-text/i);
    const name = screen.getAllByTestId(/-horizontal-name/i);
    const doneDate = screen.getAllByTestId(/-horizontal-done-date/i);
    const shareBtn = screen.getAllByTestId(/-horizontal-share-btn/i);

    expect(image).toHaveLength(2);
    expect(topText).toHaveLength(2);
    expect(name).toHaveLength(2);
    expect(doneDate).toHaveLength(2);
    expect(shareBtn).toHaveLength(2);
  });

  it('Testa se ao clicar no botão de compartilhar um meal a url é copiada', async () => {
    const shareBtn = screen.getByTestId('0-horizontal-share-btn');
    expect(shareBtn).toBeInTheDocument();

    const clipboardText = 'http://localhost:3000/meals/52977';
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        readText: jest.fn().mockResolvedValue(clipboardText),
        writeText: jest.fn().mockResolvedValue(),
      },
      writable: true,
    });

    userEvent.click(shareBtn);

    await expect(navigator.clipboard.readText()).resolves.toBe(clipboardText);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(clipboardText);

    const alert = screen.getByText('Link copied!');
    expect(alert).toBeInTheDocument();
  });
  it('Testa se ao clicar no botão de compartilhar um drink a url é copiada', async () => {
    const shareBtn = screen.getByTestId('1-horizontal-share-btn');
    expect(shareBtn).toBeInTheDocument();

    const clipboardText = 'http://localhost:3000/drinks/178319';
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        readText: jest.fn().mockResolvedValue(clipboardText),
        writeText: jest.fn().mockResolvedValue(),
      },
      writable: true,
    });

    userEvent.click(shareBtn);

    await expect(navigator.clipboard.readText()).resolves.toBe(clipboardText);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(clipboardText);

    const alert = screen.getByText('Link copied!');
    expect(alert).toBeInTheDocument();
  });

  it('Testa se ao clicar no botão meals apenas as receitas de comida são exibidas', () => {
    const filterByFoodBtn = screen.getByTestId('filter-by-meal-btn');
    expect(filterByFoodBtn).toBeInTheDocument();

    userEvent.click(filterByFoodBtn);

    const image = screen.getAllByTestId(/-horizontal-image/i);
    const topText = screen.getAllByTestId(/-horizontal-top-text/i);
    const name = screen.getAllByTestId(/-horizontal-name/i);
    const doneDate = screen.getAllByTestId(/-horizontal-done-date/i);
    const shareBtn = screen.getAllByTestId(/-horizontal-share-btn/i);

    expect(image).toHaveLength(1);
    expect(topText).toHaveLength(1);
    expect(name).toHaveLength(1);
    expect(doneDate).toHaveLength(1);
    expect(shareBtn).toHaveLength(1);
  });

  it('Testa se ao clicar no botão drinks apenas as receitas de bebida são exibidas', () => {
    const filterByDrinkBtn = screen.getByTestId('filter-by-drink-btn');
    expect(filterByDrinkBtn).toBeInTheDocument();

    userEvent.click(filterByDrinkBtn);

    const image = screen.getAllByTestId(/-horizontal-image/i);
    const topText = screen.getAllByTestId(/-horizontal-top-text/i);
    const name = screen.getAllByTestId(/-horizontal-name/i);
    const doneDate = screen.getAllByTestId(/-horizontal-done-date/i);
    const shareBtn = screen.getAllByTestId(/-horizontal-share-btn/i);

    expect(image).toHaveLength(1);
    expect(topText).toHaveLength(1);
    expect(name).toHaveLength(1);
    expect(doneDate).toHaveLength(1);
    expect(shareBtn).toHaveLength(1);

    userEvent.click(screen.getByTestId('filter-by-all-btn'));

    const image2 = screen.getAllByTestId(/-horizontal-image/i);
    expect(image2).toHaveLength(2);
  });
});
