import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
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
            src={ drinkIcon }
            alt="search"
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
