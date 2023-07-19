import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import drinkIcon from '../style/imgs/iconDrinks.svg';
import mealIcon from '../style/imgs/iconMeals.svg';
import '../style/Footer.css';

function Footer() {
  const history = useHistory();

  return (
    <footer
      data-testid="footer"
      className="footer"
    >
      <div>
        <button
          onClick={ () => history.push('/drinks') }
        >
          <img
            data-testid="drinks-bottom-btn"
            alt="search"
            src={ drinkIcon }
          />
        </button>
        <button
          onClick={ () => history.push('/meals') }
        >
          <img
            data-testid="meals-bottom-btn"
            alt="search"
            src={ mealIcon }
          />
        </button>
      </div>
    </footer>
  );
}

export default Footer;
