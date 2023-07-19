import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import logoRecipes from '../style/imgs/logoRecipesG.svg';
import tomate from '../style/imgs/tomate.svg';
import '../style/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const emailCheck = email.toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    const MIN_LENGTH_LOGIN = 6;
    const passwordCheck = password.length > MIN_LENGTH_LOGIN;
    if (emailCheck && passwordCheck) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  return (
    <div className="loginContainer">
      <img src={ tomate } alt="tomate" className="tomate" />
      <img src={ logoRecipes } alt="logo" className="logoRecipesG" />
      <section className="formContainer">
        <h3>LOGIN</h3>
        <form className="loginInputs">
          <input
            data-testid="email-input"
            type="email"
            value={ email }
            placeholder="Email"
            onChange={ ({ target }) => setEmail(target.value) }
          />

          <input
            data-testid="password-input"
            type="password"
            placeholder="Password"
            onChange={ ({ target }) => setPassword(target.value) }
          />

          <button
            data-testid="login-submit-btn"
            type="button"
            disabled={ disabled }
            onClick={ () => {
              const user = {
                email,
              };
              localStorage.user = JSON.stringify(user);
              history.push('/meals');
            } }
          >
            ENTER
          </button>

        </form>
      </section>
    </div>
  );
}

export default Login;
