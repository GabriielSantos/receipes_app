import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { favRecipe,
  saveFavRecipe } from '../services/InProgressStorageFunctions';

function RecipeInProgressPage() {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const [recipe, setRecipe] = useState(null);
  const [checkedItem, setCheckedItem] = useState([]);
  const [isFavOrNot, setIsFavOrNot] = useState(false);
  const [isSharedOrNot, setIsSharedOrNot] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(
        location.pathname.includes('meals')
          ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
          : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      const data = await response.json();
      setRecipe(data.meals?.[0] || data.drinks?.[0]);
    };

    fetchRecipe();
  }, [id, location.pathname]);

  useEffect(() => {
    const getStorage = () => `checkedItem_${location.pathname}`;

    const checketdItemsStore = JSON.parse(localStorage
      .getItem(getStorage())) || [];
    setCheckedItem(checketdItemsStore);
  }, [location.pathname]);

  useEffect(() => {
    setIsFavOrNot(favRecipe(id, recipe?.idMeal, recipe?.idDrink));
  }, [id, recipe]);

  useEffect(() => {
    const getStorage = () => `checkedItem_${location.pathname}`;

    localStorage.setItem(getStorage(), JSON.stringify(checkedItem));
  }, [checkedItem, location.pathname]);

  const handleItem = ({ target }, ingredientIndex) => {
    const { checked } = target;
    setCheckedItem((prevCheckedItems) => {
      if (checked) {
        return [...prevCheckedItems, ingredientIndex];
      }
      return prevCheckedItems.filter((index) => index !== ingredientIndex);
    });
  };

  const shareToggle = () => {
    const newURLAdress = `${window.location.origin}${window.location.pathname
      .replace('/in-progress', '')}`;
    navigator.clipboard.writeText(newURLAdress);
    setIsSharedOrNot(true);
  };

  const renderItems = () => {
    const limitOfItems = 21;
    const items = [];

    for (let index = 0; index <= limitOfItems; index += 1) {
      const item = recipe?.[`strIngredient${index}`];

      if (item) {
        const itemTestId = `${index - 1}-ingredient-step`;
        const isChecked = checkedItem.includes(index);

        const labelStyle = {
          textDecoration: isChecked ? 'line-through solid rgb(0, 0, 0)' : 'none',
        };

        const handleItemChange = (event) => {
          handleItem(event, index);
        };

        items.push(
          <label key={ index } data-testid={ itemTestId } style={ labelStyle }>
            <input
              type="checkbox"
              checked={ isChecked }
              onChange={ handleItemChange }
            />
            {item}
          </label>,
        );
      }
    }

    return items;
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strDrinkThumb,
    strDrink,
    strAlcoholic,
  } = recipe;

  const saveRecipeToLocalStorage = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const newRecipe = {
      id: recipe?.idMeal || recipe?.idDrink,
      nationality: recipe?.strArea || '',
      name: recipe?.strMeal || recipe?.strDrink,
      category: recipe?.strCategory || recipe?.strAlcoholic,
      image: recipe?.strMealThumb || recipe?.strDrinkThumb,
      tags: recipe?.strTags ? recipe?.strTags.split(',') : [],
      alcoholicOrNot: recipe?.strAlcoholic || '',
      type: recipe?.idMeal ? 'meal' : 'drink',
      doneDate: new Date().toISOString(),
    };
    localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, newRecipe]));
  };

  const isAllIngredientsChecked = checkedItem
    .length === renderItems().length;

  const finishRecipe = () => {
    saveRecipeToLocalStorage();
    history.push('/done-recipes');
  };

  const handleFavorite = () => {
    if (isFavOrNot) {
      setIsFavOrNot(false);
      saveFavRecipe(id, recipe, false);
    } else {
      setIsFavOrNot(true);
      saveFavRecipe(id, recipe, true);
    }
  };

  return (
    <div>
      <div>
        <p data-testid="recipe-category">
          {strMeal ? strCategory : `${strCategory} : ${strAlcoholic}`}
        </p>
        <button onClick={ shareToggle } data-testid="share-btn">
          Compartilhar
        </button>
        {isSharedOrNot && <p>Link copied!</p>}
        <button
          data-testid="favorite-btn"
          type="button"
          onClick={ handleFavorite }
          src={ isFavOrNot ? blackHeartIcon : whiteHeartIcon }
        >
          {isFavOrNot ? (
            <img src={ blackHeartIcon } alt="Favorito" />
          ) : (
            <img src={ whiteHeartIcon } alt="Não favorito" />
          )}
        </button>
      </div>
      <div>
        <img
          data-testid="recipe-photo"
          src={ strMealThumb || strDrinkThumb }
          alt="foto da receita"
        />
        <h1 data-testid="recipe-title">{strMeal || strDrink}</h1>
      </div>
      <div>
        <div>
          <h2>Ingredientes:</h2>
          {renderItems()}
        </div>
        <p data-testid="instructions">{strInstructions}</p>
        <button
          data-testid="finish-recipe-btn"
          onClick={ finishRecipe }
          disabled={ !isAllIngredientsChecked }

        >
          Finalizar Receita
        </button>
      </div>
    </div>
  );
}

export default RecipeInProgressPage;
