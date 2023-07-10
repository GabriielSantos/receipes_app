import React, { useEffect, useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

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
    <section>
      <form>
        <input
          data-testid="email-input"
          type="email"
          placeholder="Digite seu email"
          onChange={ ({ target }) => setEmail(target.value) }
        />

        <input
          data-testid="password-input"
          type="password"
          placeholder="Insira sua senha"
          onChange={ ({ target }) => setPassword(target.value) }
        />

        <button
          data-testid="login-submit-btn"
          type="button"
          disabled={ disabled }
        >
          Enter
        </button>

      </form>
    </section>
  );
}

export default Login;
