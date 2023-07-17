import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

function RecipeInProgress() {
  const { id } = useParams();
  const location = useLocation();
  const [recipe, setRecipe] = useState('');
  const [checkedItem, setCheckedItem] = useState([]);

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

  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strDrinkThumb,
    strDrink,
    strAlcoholic,
  } = recipe;

  return (
    <div>
      <div>
        <p data-testid="recipe-category">
          {strMeal ? strCategory : `${strCategory} : ${strAlcoholic}`}
        </p>
        <button
          data-testid="share-btn"
        >
          Compartilhar
        </button>
        {}
        <button
          data-testid="favorite-btn"
          type="button"
        >
          {}
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
        >
          Finalizar Receita
        </button>
      </div>
    </div>
  );
}

export default RecipeInProgress;
